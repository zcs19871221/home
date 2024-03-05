package com.cs.home.NodeServers;

import com.cs.home.NpmProjects.NpmProject;
import com.cs.home.NpmProjects.NpmProjectHelper;
import com.cs.home.NpmProjects.NpmProjectsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NodeServersServiceImpl implements NodeServersService {
    private final Map<Integer, ProcessInfo> idMapServerProcess = new HashMap<>();

    private final NodeServerRepository nodeServerRepository;

    private final NodeServerMapper nodeServerMapper;

    private final NpmProjectsRepository npmProjectsRepository;


    @PersistenceContext
    EntityManager entityManager;
    private Boolean shutDownhook = false;

    private PortPath checkPath(NodeServer nodeServer) throws IOException {
        Path path = Paths.get(nodeServer.getNpmProject().getPath(),
                nodeServer.getPortConfigFileRelativePath());
        File file = new File(path.toString());
        PortPath portPath = new PortPath();
        if (!file.isFile()) {
            portPath.errorMsg = "端口配置文件" + path + "不存在或不是文件";
            portPath.errorField = ErrorField.PORT_CONFIG_FILE;
            return portPath;
        }
        String content =
                Files.readString(path);
        String portReg = URLDecoder.decode(nodeServer.getPortReg(), StandardCharsets.UTF_8);
        Pattern pattern = Pattern.compile(portReg);
        Matcher matcher = pattern.matcher(content);

        portPath.path = path;
        portPath.matcher = matcher;
        portPath.portReg = portReg;

        if (!matcher.find() || matcher.groupCount() == 0) {
            portPath.errorMsg = "在文件" + path +
                    "中没找到正则：/" + portReg + "/ 匹配的端口";
            portPath.errorField = ErrorField.PORT_REG;

        }
        return portPath;
    }

    private NodeServer checkAndFill(NodeServerCreatedOrUpdated nodeServerCreatedOrUpdated) throws IOException {

        NpmProject npmProject =
                npmProjectsRepository.getReferenceById(nodeServerCreatedOrUpdated.getNpmProjectId());
        NodeServer nodeServer =
                nodeServerMapper.map(nodeServerCreatedOrUpdated);

        npmProject.addNodeServer(nodeServer);

        String projectErrorMsg =
                NpmProjectHelper.checkPath(nodeServer.getNpmProject());
        if (projectErrorMsg != null) {
            throw new RuntimeException(projectErrorMsg);
        }
        PortPath portPath = checkPath(nodeServer);
        if (portPath.errorMsg != null) {
            throw new RuntimeException(portPath.errorMsg);
        }
        if (nodeServerCreatedOrUpdated.getPostServers() != null) {
            for (NodeServerCreatedOrUpdated child : nodeServerCreatedOrUpdated.getPostServers()) {
                nodeServer.addPostServer(checkAndFill(child));
            }
        }

        return nodeServer;
    }

    @Override
    public NodeServerResponse map(NodeServer nodeServer) throws Exception {

        NodeServerResponse nodeServerResponse =
                nodeServerMapper.map(nodeServer);


        nodeServerResponse.setNpmProjectId(nodeServer.getNpmProject().getId());
        if (nodeServer.getPostServers() != null) {
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

        String projectErrorMsg =
                NpmProjectHelper.checkPath(nodeServer.getNpmProject());
        if (projectErrorMsg != null) {
            nodeServerResponse.setErrorMsg(projectErrorMsg);
            nodeServerResponse.setErrorField(ErrorField.PROJECT_PATH);
            return nodeServerResponse;
        }

        PortPath portPath = checkPath(nodeServer);
        if (portPath.errorMsg != null) {
            nodeServerResponse.setErrorMsg(portPath.errorMsg);
        } else {
            nodeServerResponse.setPort(Integer.parseInt(portPath.matcher.group(1)));
        }

        return nodeServerResponse;
    }

    @Override
    @Transactional
    public List<NodeServerResponse> createOrUpdateList(List<NodeServerCreatedOrUpdated> nodeServerCreatedOrUpdatedList) throws Exception {

        nodeServerRepository.deleteAll();
        for (Integer nodeServerId : idMapServerProcess.keySet()) {
            stopServer(nodeServerId);
        }
        entityManager.flush();
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


    @Override
    public void changePort(Integer nodeServerId, Integer port) throws IOException {
        NodeServer nodeServer =
                nodeServerRepository.getReferenceById(nodeServerId);

        PortPath portPath = checkPath(nodeServer);
        if (portPath.errorMsg == null) {
            String newContent = portPath.content.substring(0,
                    portPath.matcher.start(1)) + port + portPath.content.substring(portPath.matcher.end(1));
            Files.writeString(portPath.path, newContent);
        }
    }

    @Override
    public String logs(Integer nodeServerId) {
        if (idMapServerProcess.containsKey(nodeServerId)) {
            return idMapServerProcess.get(nodeServerId).getLog();
        }
        return "";
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
                checkAndFill(nodeServerCreatedOrUpdated);
        nodeServerRepository.save(nodeServer);
        return map(nodeServer);
    }

    @Override
    @Transactional
    public void delete(Integer nodeServerId) throws IOException {
        nodeServerRepository.deleteById(nodeServerId);
        stopServer(nodeServerId);
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
        ProcessInfo processInfo = new ProcessInfo(p.start(), nodeServer,
                log, nodeServer.getPrevServer() == null ? null : nodeServer.getPrevServer().getId(),
                nodeServer.getPostServers() == null ?
                        new ArrayList<>() :
                        nodeServer.getPostServers().stream().map(NodeServer::getId).collect(Collectors.toList()));
        idMapServerProcess.put(nodeServerId, processInfo);


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

        if (processInfo.getPrevServerId() != null) {
            startServer(processInfo.getPrevServerId());
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


                if (strLine.contains("success") || strLine.contains("api server started at") || strLine.contains(" message: 'start at ")) {
                    processInfo.status = NodeServerStatus.SUCCESS;
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
            nodeServerResponses.add(map(nodeServer));
        }
        return nodeServerResponses;
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
        for (Integer postServerId : processInfo.getPostServerIds()) {
            stopServer(postServerId);
        }
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

    static
    class PortPath {
        String errorMsg = null;

        ErrorField errorField = null;
        Path path;
        String portReg;
        Matcher matcher;
        String content;
    }


}
