package com.cs.home.nodeServer;

import com.cs.home.npmProject.NpmProject;
import com.cs.home.npmProject.NpmProjectsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class NodeServersServiceImpl implements NodeServersService {
    private static final ConcurrentHashMap<Integer, ProcessInfo> idMapServerProcess =
            new ConcurrentHashMap<>();

    private final NodeServerRepository nodeServerRepository;

    private final NpmProjectsRepository npmProjectsRepository;

    private final NodeServerMapper nodeServerMapper;
    private final MessageSource messageSource;
    private Boolean shutdownHook = false;

    @Override
    public void clearLog(Integer nodeServerId) throws IOException {
        ProcessInfo processInfo = idMapServerProcess.get(nodeServerId);
        doClearLog(processInfo);
    }


    private void doClearLog(ProcessInfo processInfo) throws IOException {
        if (processInfo != null) {
            Files.writeString(processInfo.getLogFile().toPath(), "");
        }
    }

    @Override
    @Transactional
    public NodeServerResponse create(NodeServerCreated nodeServerCreated) throws Exception {
        NodeServer nodeServer =
                nodeServerMapper.map(nodeServerCreated);
        valid(nodeServerCreated.getNpmProjectId());
        nodeServer.setNpmProject(npmProjectsRepository.getReferenceById(nodeServerCreated.getNpmProjectId()));
        return nodeServerMapper.map(nodeServerRepository.save(nodeServer));
    }

    @Override
    @Transactional
    public NodeServerResponse update(NodeServerUpdated nodeServerUpdated) throws Exception {
        Integer id = nodeServerUpdated.getId();
        Locale locale = LocaleContextHolder.getLocale();

        if (!nodeServerRepository.existsById(id)) {
            throw new IllegalArgumentException(messageSource.getMessage("nodeServerIdNotExist"
                    , new Integer[]{id},
                    locale));
        }

        Integer npmProjectId = nodeServerUpdated.getNpmProjectId();
        valid(npmProjectId);


        NodeServer nodeServer = nodeServerMapper.map(nodeServerUpdated);

        NpmProject npmProject =
                npmProjectsRepository.getReferenceById(npmProjectId);

        nodeServer.setNpmProject(npmProject);

        return nodeServerMapper.map(nodeServerRepository.save(nodeServer));
    }

    private void valid(Integer npmProjectId) {
        Locale locale = LocaleContextHolder.getLocale();
        if (!npmProjectsRepository.existsById(npmProjectId)) {
            throw new IllegalArgumentException(messageSource.getMessage("npmServerIdNotExist"
                    , new Integer[]{npmProjectId},
                    locale));
        }

    }

    @Override
    @Transactional
    public void delete(Integer nodeServerId) throws IOException {
        if (nodeServerRepository.existsById(nodeServerId)) {
            nodeServerRepository.deleteById(nodeServerId);
            stop(nodeServerId);
        }
    }

    @Override
    public void start(Integer nodeServerId) throws IOException {
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
                log);
        processInfo.setPath(nodeServer.getNpmProject().getPath());
        processInfo.setCommand(nodeServer.getCommand());
        idMapServerProcess.put(nodeServerId, processInfo);


        if (!shutdownHook) {
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                for (Integer i : idMapServerProcess.keySet()) {
                    try {
                        stop(i);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
                System.exit(0);
            }));
            shutdownHook = true;
        }
    }

    @Override
    public String logs(Integer nodeServerId) throws IOException {
        if (idMapServerProcess.containsKey(nodeServerId)) {
            ProcessInfo processInfo = idMapServerProcess.get(nodeServerId);
            var str = Files.readString(processInfo.getLogFile().toPath());
            System.out.println(str.length());
            return str;
        }
        return "";
    }

    @Override
    public synchronized Map<Integer, NodeServerRunningInfo> runningInfo() throws IOException {

        for (Map.Entry<Integer, ProcessInfo> numberProcessInfoEntry :
                idMapServerProcess.entrySet()) {
            ProcessInfo processInfo = numberProcessInfoEntry.getValue();

            String strLine;

            StringBuilder newStr = new StringBuilder();
            boolean needCleanLog = false;
            while ((strLine = processInfo.getBr().readLine()) != null) {
                newStr.append(strLine);
                if (strLine.contains("Compiling ")) {
                    newStr = new StringBuilder(strLine);
                    processInfo.setStatus(NodeServerStatus.COMPILING);
                    needCleanLog = true;
                    continue;
                }

                Pattern pattern = Pattern.compile("\\berr(or)?\\b",
                        Pattern.CASE_INSENSITIVE);
                Matcher matcher = pattern.matcher(strLine);
                if (matcher.find()) {
                    processInfo.setStatus(NodeServerStatus.ERROR);
                    continue;
                }


                if (strLine.contains(" result: 200 200") || strLine.contains("api server started at") || strLine.contains(" message: 'start at ")) {
                    processInfo.setStatus(NodeServerStatus.SUCCESS);
                }
            }

            if (needCleanLog) {
                Files.writeString(processInfo.getLogFile().toPath(), newStr);
            }

        }
        return nodeServerMapper.map(idMapServerProcess);
    }

    @Override
    public List<NodeServerResponse> list() throws Exception {
        List<NodeServer> nodeServers = nodeServerRepository.findAll();
        List<NodeServerResponse> nodeServerResponses = new ArrayList<>();
        for (NodeServer nodeServer : nodeServers) {
            nodeServerResponses.add(nodeServerMapper.map(nodeServer));
        }
        return nodeServerResponses;
    }

    @Override
    public void stop(Integer nodeServerId) throws IOException {
        if (!idMapServerProcess.containsKey(nodeServerId)) {
            return;
        }


        ProcessInfo processInfo = idMapServerProcess.get(nodeServerId);

        System.out.println("stopping " + processInfo.getPath() + " " + processInfo.getCommand());

        Process process = processInfo.getProcess();
        process.descendants().forEach(ProcessHandle::destroy);
        process.destroy();


        processInfo.getBr().close();
        processInfo.getReadStream().close();
        doClearLog(processInfo);

        idMapServerProcess.remove(nodeServerId);
        System.out.println(processInfo.getId() + processInfo.getPath() + " " + processInfo.getCommand());

    }

    @Override
    public void restart(Integer nodeServerId) throws IOException {
        stop(nodeServerId);
        start(nodeServerId);
    }

    private Path getLogPath(String name) {
        String tmpDir = System.getProperty("java.io.tmpdir");
        return Paths.get(tmpDir, name + ".log");
    }

}
