package com.cs.home.frontEndProjects;


import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@AllArgsConstructor
class ProcessInfo {
    Process process;
    FrontProject se;
    File log;
}

@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Slf4j
public class ServiceImpl implements Service {

    private final Repository seRepository;
    private final Mapper mapper;
    private final Map<Integer, ProcessInfo> idMapProcess = new HashMap<>();
    private boolean shutDownhook = false;

    @Override
    @Transactional
    public Response save(CreatePayload seCreatePayload) {

        FrontProject post = mapper.mapping(seCreatePayload);
        return mapper.mapping(seRepository.save(post));
    }

    @Override
    public Response get(Integer id) {
        Optional<FrontProject> postMaybe = seRepository.findById(id);
        return postMaybe.map(mapper::mapping).orElse(null);
    }

    @Override
    public List<Response> getAll() {
        return mapper.mapping(seRepository.findAll());
    }

    @Override
    public Response update(Integer id, SeUpdatePayload seUpdatePayload) {
        FrontProject existingPost = seRepository.getReferenceById(id);
        mapper.updateSe(existingPost, mapper.mapping(seUpdatePayload));
        return mapper.mapping(seRepository.save(existingPost));
    }

    @Override
    public void delete(Integer id) {
        seRepository.deleteById(id);
    }

    @Override
    public void getOrCreateSeProcess(Integer seId) throws IOException {
        if (idMapProcess.containsKey(seId)) {
            idMapProcess.get(seId);
            return;
        }
        FrontProject se = seRepository.getReferenceById(seId);
        String path = se.getPath();
        String[] commands = se.getCommand().split(" ");
        if (commands[0].contains("npm")) {
            commands[0] = "npm.cmd";
        }
        ProcessBuilder p = new ProcessBuilder(commands);

        p.directory(new File(path));
        p.redirectErrorStream(true);
        File log = new File(getLogPath(se.getName()).toString());
        p.redirectOutput(log);
        idMapProcess.put(seId, new ProcessInfo(p.start(), se, log));

        if (!shutDownhook) {
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                for (Integer i : idMapProcess.keySet()) {
                    stopSeProcess(i);
                }
            }));
            shutDownhook = true;
        }

    }

    private Path getLogPath(String name) {
        String tmpDir = System.getProperty("java.io.tmpdir");
        return Paths.get(tmpDir, name + ".log");
    }

    @Override
    public Map<Integer, LogInfo> getLogs() throws IOException {
        Map<Integer, LogInfo> logInfos = new HashMap<>();
        for (Map.Entry<Integer, ProcessInfo> numberProcessInfoEntry :
                idMapProcess.entrySet()) {
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

    private void putLogInfos(String log,
                             Map<Integer, LogInfo> logInfos,
                             int id) {
        if (log.contains("success")) {
            logInfos.put(id, new LogInfo(log, Status.SUCCESS, id));
            return;
        }
        String[] errors = {"error", "Err", "Error"};
        if (Arrays.stream(errors).anyMatch(log::contains)) {
            logInfos.put(id, new LogInfo(log, Status.ERROR, id));
            return;
        }
        logInfos.put(id, new LogInfo(log, Status.UNKNOWN, id));
    }

    public void vsCode(String target) throws IOException {
        ProcessBuilder p = new ProcessBuilder("code.cmd", target);
        p.start();
    }

    public void replaceFile(ReplacePayload replacePayload) throws IOException {
        Path filePath = Paths.get(replacePayload.getFile());
        String content = Files.readString(filePath);
        content = content.replace(replacePayload.getSource(),
                replacePayload.getTarget());
        Files.writeString(filePath, content);
    }


    @Override
    public void stopSeProcess(Integer seId) {
        if (!idMapProcess.containsKey(seId)) {
            return;
        }

        idMapProcess.get(seId).process.descendants().forEach(ProcessHandle::destroy);
        idMapProcess.get(seId).process.destroy();
        idMapProcess.remove(seId);
    }


}
