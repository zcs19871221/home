package com.cs.home.NodeServers;

import com.cs.home.NpmProjects.NpmProject;
import com.cs.home.NpmProjects.NpmProjectsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class NodeServersServiceImpl implements NodeServersService {
    private final Map<Integer, ProcessInfo> idMapServerProcess = new HashMap<>();

    private final NodeServerRepository nodeServerRepository;
    private final NpmProjectsRepository npmProjectsRepository;

    private final NodeServerMapper nodeServerMapper;

    private Boolean shutDownhook = false;

    private NodeServer fillNpmProjectAndChildrenThenMap(NodeServerCreatedOrUpdated nodeServerCreatedOrUpdated) {

        NpmProject npmProject =
                npmProjectsRepository.getReferenceById(nodeServerCreatedOrUpdated.getNpmProjectId());
        NodeServer nodeServer = null;
        NodeServer mapped =
                nodeServerMapper.map(nodeServerCreatedOrUpdated);
        if (nodeServerCreatedOrUpdated.getId() != null) {
            nodeServer =
                    nodeServerRepository.getReferenceById(nodeServerCreatedOrUpdated.getId());
            nodeServerMapper.merge(mapped, nodeServer);
            for (NodeServer postServer : nodeServer.getPostServers()) {

            }
        } else {
            nodeServer = mapped;
        }

        npmProject.addNodeServer(nodeServer);
        if (nodeServerCreatedOrUpdated.getPostServers() != null) {
            for (NodeServerCreatedOrUpdated child : nodeServerCreatedOrUpdated.getPostServers()) {
                nodeServer.addPostServer(fillNpmProjectAndChildrenThenMap(child));
            }
        }

        return nodeServer;
    }

    @Override
    public NodeServerResponse fillThenMap(NodeServer nodeServer) throws Exception {
        NodeServerResponse nodeServerResponse =
                nodeServerMapper.map(nodeServer);
        nodeServerResponse.setNpmProjectId(nodeServer.getNpmProject().getId());
        if (nodeServer.getPostServers() != null) {
            Set<NodeServerResponse> postServers = new HashSet<>();
            for (NodeServer child : nodeServer.getPostServers()) {
                postServers.add(fillThenMap(child));
            }
            Set<Integer> postServerIds = new HashSet<>();

            if (nodeServer.getPostServers() != null) {
                for (NodeServer postServer : nodeServer.getPostServers()) {
                    postServerIds.add(postServer.getId());
                }
            }
            nodeServerResponse.setPostServerIds(postServerIds);
            if (nodeServer.getPrevServer() != null) {
                nodeServerResponse.setPrevServerId(nodeServer.getPrevServer().getId());
            }
        }

        return fillPort(nodeServerResponse, nodeServer);
    }

    @Override
    @Transactional
    public List<NodeServerResponse> createOrUpdateList(List<NodeServerCreatedOrUpdated> nodeServerCreatedOrUpdatedList) throws Exception {
        List<NodeServerResponse> nodeServerResponses = new ArrayList<>();
        for (NodeServerCreatedOrUpdated nodeServerCreatedOrUpdated : nodeServerCreatedOrUpdatedList) {
            nodeServerResponses.add(createOrUpdate(nodeServerCreatedOrUpdated));
        }
        return nodeServerResponses;
    }

    @Override
    public void clearLog(Integer nodeServerId) throws IOException {
        ProcessInfo processInfo = idMapServerProcess.get(nodeServerId);
        doClearLog(processInfo);
    }


    private void doClearLog(ProcessInfo processInfo) throws IOException {
        if (processInfo != null) {
            Files.writeString(processInfo.getLogFile().toPath(), "");
            processInfo.log = "";
        }
    }

    @Override
    @Transactional
    public NodeServerResponse createOrUpdate(NodeServerCreatedOrUpdated nodeServerCreatedOrUpdated) throws Exception {
        NodeServer nodeServer =
                fillNpmProjectAndChildrenThenMap(nodeServerCreatedOrUpdated);
        nodeServerRepository.save(nodeServer);
        return fillThenMap(nodeServer);
    }

    @Override
    public void delete(Integer nodeServerId) {
        nodeServerRepository.deleteById(nodeServerId);
    }


    @Override
    public void startServer(Integer nodeServerId) throws IOException {
        if (idMapServerProcess.containsKey(nodeServerId)) {
            return;
        }
        NodeServer nodeServer = nodeServerRepository.getReferenceById(nodeServerId);

        String path = nodeServer.getNpmProject().getPath();
        String[] commands = nodeServer.getCommand().split(" ");
        if (commands[0].contains("npm")) {
            commands[0] = "npm.cmd";
        }
        ProcessBuilder p = new ProcessBuilder(commands);

        p.directory(new File(path));
        p.redirectErrorStream(true);
        File log =
                new File(getLogPath(nodeServer.getNpmProject().getId() +
                        "-server" + nodeServerId).toString());
        p.redirectOutput(log);
        idMapServerProcess.put(nodeServerId, new ProcessInfo(p.start(), nodeServer,
                log));


        if (!shutDownhook) {
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                for (Integer i : idMapServerProcess.keySet()) {
                    try {
                        stopServer(i);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
            }));
            shutDownhook = true;
        }

    }

    @Override
    public Map<Integer, NodeServerRunningInfo> serverRunningInfos() throws IOException {

        for (Map.Entry<Integer, ProcessInfo> numberProcessInfoEntry :
                idMapServerProcess.entrySet()) {
            ProcessInfo processInfo = numberProcessInfoEntry.getValue();
            StringBuilder sb = new StringBuilder();

            String strLine;

            while ((strLine = processInfo.getBr().readLine()) != null) {
                sb.append(strLine);
                sb.append("\n");

                if (strLine.contains("Compiling ")) {
                    processInfo.status = NodeServerStatus.COMPILING;
                    processInfo.log = "";
                    continue;
                }

                Pattern pattern = Pattern.compile("err(or)?",
                        Pattern.CASE_INSENSITIVE);
                Matcher matcher = pattern.matcher(strLine);
                if (matcher.find()) {
                    processInfo.status = NodeServerStatus.ERROR;
                    continue;
                }

                if (strLine.contains("success") || strLine.contains("message: 'start at ")) {
                    processInfo.status = NodeServerStatus.ERROR;
                }
            }

            if (!sb.isEmpty()) {
                processInfo.log += sb.toString();
            }
        }
        return nodeServerMapper.map(idMapServerProcess);
    }

    @Override
    public List<NodeServerResponse> servers() throws Exception {
        List<NodeServer> nodeServers = nodeServerRepository.findAll();
        List<NodeServerResponse> nodeServerResponses = new ArrayList<>();
        for (NodeServer nodeServer : nodeServers) {
            nodeServerResponses.add(fillThenMap(nodeServer));
        }
        return nodeServerResponses;
    }

    private NodeServerResponse fillPort(NodeServerResponse nodeServerResponse,
                                        NodeServer nodeServer) throws Exception {
        Path path = Paths.get(nodeServer.getNpmProject().getPath(),
                nodeServer.getPortConfigFileRelativePath());
        String content =
                Files.readString(path);
        String portReg = URLDecoder.decode(nodeServer.getPortReg(), StandardCharsets.UTF_8);
        Pattern pattern = Pattern.compile(portReg);
        Matcher matcher = pattern.matcher(content);
        if (!matcher.find()) {
            throw new RuntimeException("can not find port in file: " + path + " " +
                    "with reg: " + portReg);
        }

        nodeServerResponse.setPort(Integer.parseInt(matcher.group(1)));
        return nodeServerResponse;
    }

    @Override
    public void stopServer(Integer nodeServerId) throws IOException {
        if (!idMapServerProcess.containsKey(nodeServerId)) {
            return;
        }

        ProcessInfo processInfo = idMapServerProcess.get(nodeServerId);
        Process process = processInfo.getProcess();
        process.descendants().forEach(ProcessHandle::destroy);
        process.destroy();

        processInfo.getReadStream().close();
        doClearLog(processInfo);
        idMapServerProcess.remove(nodeServerId);
    }

    @Override
    public void restartServer(Integer nodeServerId) throws IOException {
        stopServer(nodeServerId);
        startServer(nodeServerId);
    }

    private Path getLogPath(String name) {
        String tmpDir = System.getProperty("java.io.tmpdir");
        return Paths.get(tmpDir, name + ".log");
    }


}
