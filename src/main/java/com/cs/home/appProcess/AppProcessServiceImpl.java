package com.cs.home.appProcess;

import com.cs.home.project.Project;
import com.cs.home.project.ProjectsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
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
public class AppProcessServiceImpl implements AppProcessService {
    private static final ConcurrentHashMap<Integer, RunningProcess> idMapProcess =
            new ConcurrentHashMap<>();

    private final AppProcessRepository appProcessRepository;

    private final ProjectsRepository projectsRepository;

    private final AppProcessMapper appProcessMapper;
    private final MessageSource messageSource;


    @PostConstruct
    private void addShutDownHook() {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            for (Integer i : idMapProcess.keySet()) {
                try {
                    stop(i);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            System.exit(0);
        }));
    }

    public void start(Integer appProcessId) throws IOException {

        if (idMapProcess.containsKey(appProcessId)) {
            return;
        }
        AppProcess appProcess = appProcessRepository.getReferenceById(appProcessId);
        String[] commands = appProcess.getCommand().split(" ");
        if (System.getProperty("os.name").startsWith("Windows") && !commands[0].startsWith(".")) {
            commands[0] = commands[0] + ".cmd";
        }

        ProcessBuilder pb = new ProcessBuilder(commands);
        pb.directory(new File(appProcess.getProject().getPath()));
        pb.redirectErrorStream(true);
        File log =
                new File(getLogPath(appProcessId));
        pb.redirectOutput(log);
        Process p = pb.start();

        FileInputStream fileInputStream = new FileInputStream(log);
        BufferedReader br =
                new BufferedReader(new InputStreamReader(fileInputStream,
                        StandardCharsets.UTF_8)
                );
        idMapProcess.put(appProcessId, new RunningProcess(p, fileInputStream,
                br, appProcessId));
    }

    @Override
    public void stop(Integer appProcessId) throws IOException {
        if (!idMapProcess.containsKey(appProcessId)) {
            return;
        }

        RunningProcess runningProcess = idMapProcess.get(appProcessId);


        runningProcess.getProcess().descendants().forEach(ProcessHandle::destroy);
        runningProcess.getProcess().destroy();

        runningProcess.getBr().close();
        runningProcess.getFileInputStream().close();

        clearLog(appProcessId);

        idMapProcess.remove(appProcessId);
    }

    @Override
    public void restart(Integer appProcessId) throws IOException {
        stop(appProcessId);
        start(appProcessId);
    }

    @Override
    @Transactional
    public AppProcessResponse create(AppProcessCreated appProcessCreated) throws Exception {
        AppProcess appProcess =
                appProcessMapper.map(appProcessCreated);
        valid(appProcessCreated.getProjectId());
        appProcess.setProject(projectsRepository.getReferenceById(appProcessCreated.getProjectId()));
        return appProcessMapper.map(appProcessRepository.save(appProcess));
    }

    @Override
    @Transactional
    public AppProcessResponse update(AppProcessUpdated appProcessUpdated) throws Exception {
        Integer id = appProcessUpdated.getId();
        Locale locale = LocaleContextHolder.getLocale();

        if (!appProcessRepository.existsById(id)) {
            throw new IllegalArgumentException(messageSource.getMessage("appProcessIdNotExist"
                    , new Integer[]{id},
                    locale));
        }

        Integer projectId = appProcessUpdated.getProjectId();
        valid(projectId);


        AppProcess appProcess = appProcessMapper.map(appProcessUpdated);

        Project project =
                projectsRepository.getReferenceById(projectId);

        appProcess.setProject(project);

        return appProcessMapper.map(appProcessRepository.save(appProcess));
    }

    private void valid(Integer projectId) {
        Locale locale = LocaleContextHolder.getLocale();
        if (!projectsRepository.existsById(projectId)) {
            throw new IllegalArgumentException(messageSource.getMessage("projectIdNotExist"
                    , new Integer[]{projectId},
                    locale));
        }

    }

    @Override
    @Transactional
    public void delete(Integer appProcessId) throws IOException {
        if (appProcessRepository.existsById(appProcessId)) {
            appProcessRepository.deleteById(appProcessId);
        }
    }

    private String getLogPath(Integer appProcessId) {
        return Paths.get(System.getProperty("java.io.tmpdir"),
                appProcessId + ".log").toString();
    }

    @Override
    public void clearLog(Integer appProcessId) throws IOException {
        Files.writeString(Paths.get(getLogPath(appProcessId)), "");
    }

    @Override
    public String logs(Integer appProcessId) throws IOException {
        if (idMapProcess.containsKey(appProcessId)) {
            return Files.readString(Paths.get(getLogPath(appProcessId)));
        }
        return "";
    }

    public synchronized Map<Integer, RunningProcessResponse> runningProcesses() throws IOException {


        for (Map.Entry<Integer, RunningProcess> numberProcessInfoEntry :
                idMapProcess.entrySet()) {
            Integer appProcessId = numberProcessInfoEntry.getKey();
            RunningProcess runningProcess = numberProcessInfoEntry.getValue();
            if (!runningProcess.getProcess().isAlive()) {
                stop(appProcessId);
                continue;
            }

            String strLine;

            StringBuilder newStr = new StringBuilder();
            boolean needCleanLog = false;
            while ((strLine = runningProcess.getBr().readLine()) != null) {
                newStr.append(strLine);
                if (strLine.contains("Compiling ")) {
                    newStr = new StringBuilder(strLine);
                    runningProcess.setStatus("Compiling");
                    needCleanLog = true;
                    continue;
                }

                Pattern pattern = Pattern.compile("\\berr(or)?\\b",
                        Pattern.CASE_INSENSITIVE);
                Matcher matcher = pattern.matcher(strLine);
                if (matcher.find()) {
                    runningProcess.setStatus("Error");
                    continue;
                }


                if (strLine.contains(" result: 200 200") || strLine.contains("api server started at") || strLine.contains(" message: 'start at ")) {
                    runningProcess.setStatus("Success");
                }
            }

            if (needCleanLog) {
                clearLog(appProcessId);
            }

        }
        return appProcessMapper.map(idMapProcess);
    }

    @Override
    public List<AppProcessResponse> list() throws Exception {
        List<AppProcess> appProcesses = appProcessRepository.findAll();
        List<AppProcessResponse> appProcessResponses = new ArrayList<>();
        for (AppProcess appProcess : appProcesses) {
            appProcessResponses.add(appProcessMapper.map(appProcess));
        }
        return appProcessResponses;
    }
}
