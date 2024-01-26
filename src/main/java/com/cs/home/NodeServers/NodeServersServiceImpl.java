package com.cs.home.NodeServers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class NodeServersServiceImpl implements NodeServersService {
    private final Map<Integer, ProcessInfo> idMapServerProcess = new HashMap<>();

    private final NodeServerRepository nodeServerRepository;

    private final NodeServerMapper nodeServerMapper;

    private final String portReg = "port:\\s*(\\d+)";

    private Boolean shutDownhook = false;

    @Override
    public NodeServerResponse save(NodeServerCreated nodeServerCreated) {
        return nodeServerMapper.map(nodeServerRepository.save(nodeServerMapper.map(nodeServerCreated)));
    }

    @Override
    public NodeServerResponse update(Integer nodeServerId,
                                     NodeServerUpdated nodeServerUpdated) {

        NodeServer exist = nodeServerRepository.getReferenceById(nodeServerId);

        nodeServerMapper.merge(exist, nodeServerUpdated);
        return nodeServerMapper.map(nodeServerRepository.save(exist));
    }

    @Override
    public void delete(Integer id) {

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

    public Map<Integer, NodeServerLog> getServerLogs() throws IOException {
        Map<Integer, NodeServerLog> logInfos = new HashMap<>();
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

    public Integer getPort(String path) throws Exception {
        String content = Files.readString(Paths.get(path,
                "project.js"));
        Pattern pattern = Pattern.compile(portReg);
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }
        throw new Exception("can not find port in file: " + path);
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

    private void putLogInfos(String log,
                             Map<Integer, NodeServerLog> logInfos,
                             int id) {
        if (log.contains("success")) {
            logInfos.put(id, new NodeServerLog(log, NodeServerStatus.SUCCESS, id));
            return;
        }
        String[] errors = {"error", "Err", "Error"};
        if (Arrays.stream(errors).anyMatch(log::contains)) {
            logInfos.put(id, new NodeServerLog(log, NodeServerStatus.ERROR, id));
            return;
        }
        logInfos.put(id, new NodeServerLog(log, NodeServerStatus.UNKNOWN, id));
    }

    private Path getLogPath(String name) {
        String tmpDir = System.getProperty("java.io.tmpdir");
        return Paths.get(tmpDir, name + ".log");
    }


}
