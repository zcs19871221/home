package com.cs.home.frontEndProjects;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class FrontEndProjectServiceImpl implements FrontEndProjectService {

    private final FrontEndRepository frontEndRepository;
    private final FrontEndProjectMapper frontEndProjectMapper;
    private final Map<Integer, ProcessInfo> idMapServerProcess = new HashMap<>();
    private final String portReg = "port:\\s*(\\d+)";
    private boolean shutDownhook = false;

    @Override
    @Transactional
    public FrontEndProjectResponse save(CreateFrontEndProjectPayload createFrontEndProjectPayload) {

        FrontEndProject frontEndProject = frontEndProjectMapper.mapping(createFrontEndProjectPayload);
        return frontEndProjectMapper.mapping(frontEndRepository.save(frontEndProject));
    }

    @Override
    public List<FrontEndProjectResponse> getAll() throws Exception {
        List<FrontEndProjectResponse> projects =
                frontEndProjectMapper.mapping(frontEndRepository.findAll());
        for (FrontEndProjectResponse project : projects) {
            project.setPort(getPort(project.getPath()));
        }
        return projects;
    }

    @Override
    public FrontEndProjectResponse update(Integer id, UpdateFrontEndProjectPayload seUpdatePayload) {
        FrontEndProject existingPost = frontEndRepository.getReferenceById(id);
        frontEndProjectMapper.updateFrontEndProject(existingPost, frontEndProjectMapper.mapping(seUpdatePayload));
        return frontEndProjectMapper.mapping(frontEndRepository.save(existingPost));
    }

    @Override
    public void delete(Integer id) {
        frontEndRepository.deleteById(id);
    }

    @Override
    public void getOrStartFrontEndServer(Integer seId) throws IOException {
        if (idMapServerProcess.containsKey(seId)) {
            idMapServerProcess.get(seId);
            return;
        }
        FrontEndProject frontend = frontEndRepository.getReferenceById(seId);
        String path = frontend.getPath();
        String[] commands = frontend.getCommand().split(" ");
        if (commands[0].contains("npm")) {
            commands[0] = "npm.cmd";
        }
        ProcessBuilder p = new ProcessBuilder(commands);

        p.directory(new File(path));
        p.redirectErrorStream(true);
        File log = new File(getLogPath(frontend.getName()).toString());
        p.redirectOutput(log);
        idMapServerProcess.put(seId, new ProcessInfo(p.start(), frontend, log));

        if (!shutDownhook) {
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                for (Integer i : idMapServerProcess.keySet()) {
                    stopFrontEndServer(i);
                }
            }));
            shutDownhook = true;
        }

    }

    @Override
    public Map<Integer, FrontEndServerLog> getLogs() throws IOException {
        Map<Integer, FrontEndServerLog> logInfos = new HashMap<>();
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


    public void vsCode(String target) throws IOException {
        ProcessBuilder p = new ProcessBuilder("code.cmd", target);
        p.start();
    }

    @Override
    public void changePort(Integer id, Integer port) throws IOException {
        FrontEndProjectResponse project = update(id,
                UpdateFrontEndProjectPayload.builder().port(port).build());

        String path = project.getPath();
        Path projectConfig = Paths.get(path,
                "project.js");
        String content = Files.readString(projectConfig);
        content = content.replaceAll(portReg, "port: " + port);
        Files.writeString(projectConfig, content);
    }

    @Override
    public void stopFrontEndServer(Integer seId) {
        if (!idMapServerProcess.containsKey(seId)) {
            return;
        }

        idMapServerProcess.get(seId).process.descendants().forEach(ProcessHandle::destroy);
        idMapServerProcess.get(seId).process.destroy();
        idMapServerProcess.remove(seId);
    }

    private void putLogInfos(String log,
                             Map<Integer, FrontEndServerLog> logInfos,
                             int id) {
        if (log.contains("success")) {
            logInfos.put(id, new FrontEndServerLog(log, FrontEndServerStatus.SUCCESS, id));
            return;
        }
        String[] errors = {"error", "Err", "Error"};
        if (Arrays.stream(errors).anyMatch(log::contains)) {
            logInfos.put(id, new FrontEndServerLog(log, FrontEndServerStatus.ERROR, id));
            return;
        }
        logInfos.put(id, new FrontEndServerLog(log, FrontEndServerStatus.UNKNOWN, id));
    }

    private Path getLogPath(String name) {
        String tmpDir = System.getProperty("java.io.tmpdir");
        return Paths.get(tmpDir, name + ".log");
    }


}
