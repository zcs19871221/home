package com.cs.home.NodeServers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
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

    private final NodeServerMapper nodeServerMapper;

    private Boolean shutDownhook = false;

    @Override
    public NodeServerResponse save(NodeServerCreated nodeServerCreated) throws Exception {
        NodeServer nodeServer =
                nodeServerRepository.save(nodeServerMapper.map(nodeServerCreated));
        NodeServerResponse nodeServerResponse =
                nodeServerMapper.map(nodeServerRepository.save(nodeServerMapper.map(nodeServerCreated)));
        return fillPort(nodeServerResponse, nodeServer);
    }

    @Override
    public NodeServerResponse update(Integer nodeServerId,
                                     NodeServerUpdated nodeServerUpdated) throws Exception {

        NodeServer exist = nodeServerRepository.getReferenceById(nodeServerId);

        nodeServerMapper.merge(exist, nodeServerUpdated);
        NodeServerResponse nodeServerResponse =
                nodeServerMapper.map(nodeServerRepository.save(exist));
        return fillPort(nodeServerResponse, exist);
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
                new File(getLogPath(nodeServer.getNpmProject().getName() +
                        "-server" + nodeServerId).toString());
        p.redirectOutput(log);
        idMapServerProcess.put(nodeServerId, new ProcessInfo(p.start(), nodeServer,
                log));

        if (!shutDownhook) {
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                for (Integer i : idMapServerProcess.keySet()) {
                    stopServer(i);
                }
            }));
            shutDownhook = true;
        }

    }

    @Override
    public Map<Integer, NodeServerRunningInfo> serverRunningInfos() throws IOException {
        Map<Integer, NodeServerRunningInfo> logInfos = new HashMap<>();
        for (Map.Entry<Integer, ProcessInfo> numberProcessInfoEntry :
                idMapServerProcess.entrySet()) {
            int id = numberProcessInfoEntry.getKey();
            ProcessInfo processInfo = numberProcessInfoEntry.getValue();
            String log = Files.readString(processInfo.log.toPath());

            int lastCompilingIndex = log.indexOf("Compiling ");
            if (lastCompilingIndex > -1) {
                log = log.substring(lastCompilingIndex);
                putLogInfos(log, logInfos, id);
            }
            putLogInfos(log, logInfos, id);
        }
        return logInfos;
    }

    @Override
    public List<NodeServerResponse> servers() throws Exception {
        List<NodeServer> nodeServers = nodeServerRepository.findAll();
        List<NodeServerResponse> nodeServerResponses = new ArrayList<>();
        for (NodeServer nodeServer : nodeServers) {
            NodeServerResponse nodeServerResponse =
                    nodeServerMapper.map(nodeServer);
            nodeServerResponses.add(fillPort(nodeServerResponse, nodeServer));
        }
        return nodeServerResponses;
    }

    private NodeServerResponse fillPort(NodeServerResponse nodeServerResponse,
                                        NodeServer nodeServer) throws Exception {
        Path path = Paths.get(nodeServer.getNpmProject().getPath(),
                nodeServer.getPortConfigFileRelativePath());
        String content =
                Files.readString(path);
        Pattern pattern = Pattern.compile(nodeServer.getPortReg());
        Matcher matcher = pattern.matcher(content);
        if (!matcher.find()) {
            throw new Exception("can not find port in file: " + path + " " +
                    "with reg: " + nodeServer.getPortReg());
        }

        nodeServerResponse.setPort(Integer.parseInt(matcher.group(1)));
        return nodeServerResponse;
    }

    @Override
    public void stopServer(Integer nodeServerId) {
        if (!idMapServerProcess.containsKey(nodeServerId)) {
            return;
        }

        idMapServerProcess.get(nodeServerId).process.descendants().forEach(ProcessHandle::destroy);
        idMapServerProcess.get(nodeServerId).process.destroy();
        idMapServerProcess.remove(nodeServerId);
    }

    @Override
    public void restartServer(Integer nodeServerId) throws IOException {
        stopServer(nodeServerId);
        startServer(nodeServerId);
    }

    private void putLogInfos(String log,
                             Map<Integer, NodeServerRunningInfo> logInfos,
                             int id) {
        if (log.contains("success")) {
            logInfos.put(id, new NodeServerRunningInfo(log, NodeServerStatus.SUCCESS, id));
            return;
        }
        String[] errors = {"error", "Err", "Error"};
        if (Arrays.stream(errors).anyMatch(log::contains)) {
            logInfos.put(id, new NodeServerRunningInfo(log, NodeServerStatus.ERROR, id));
            return;
        }
        logInfos.put(id, new NodeServerRunningInfo(log, NodeServerStatus.UNKNOWN, id));
    }

    private Path getLogPath(String name) {
        String tmpDir = System.getProperty("java.io.tmpdir");
        return Paths.get(tmpDir, name + ".log");
    }


}
