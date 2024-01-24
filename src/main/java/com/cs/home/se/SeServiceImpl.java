package com.cs.home.se;


import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
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
    Se se;
    File log;
}

@Service
@RequiredArgsConstructor
@Slf4j
public class SeServiceImpl implements SeService {

    private final SeRepository seRepository;
    private final SeMapper seMapper;
    private final Map<Integer, ProcessInfo> idMapProcess = new HashMap<>();
    private boolean shutDownhook = false;

    @Override
    @Transactional
    public SeResponse save(SeCreatePayload seCreatePayload) {

        Se post = seMapper.mapping(seCreatePayload);
        return seMapper.mapping(seRepository.save(post));
    }

    @Override
    public SeResponse get(Integer id) {
        Optional<Se> postMaybe = seRepository.findById(id);
        return postMaybe.map(seMapper::mapping).orElse(null);
    }

    @Override
    public List<SeResponse> getAll() {
        return seMapper.mapping(seRepository.findAll());
    }

    @Override
    public SeResponse update(Integer id, SeUpdatePayload seUpdatePayload) {
        Se existingPost = seRepository.getReferenceById(id);
        seMapper.updateSe(existingPost, seMapper.mapping(seUpdatePayload));
        return seMapper.mapping(seRepository.save(existingPost));
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
        Se se = seRepository.getReferenceById(seId);
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
