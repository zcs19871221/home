package com.cs.home.appProcesses;

import com.cs.home.appProcessStatus.AppProcessStatus;
import com.cs.home.appProcessStatus.AppProcessStatusRepository;
import com.cs.home.projects.Project;
import com.cs.home.projects.ProjectsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
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

    private final AppProcessStatusRepository appProcessStatusRepository;

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

        if (idMapProcess.containsKey(appProcessId) && idMapProcess.get(appProcessId).getProcess().isAlive()) {
            return;
        }

        File log = new File(getLogPath(appProcessId));
        AppProcess appProcess = appProcessRepository.getReferenceById(appProcessId);

        RunningProcess rp;
        if (!idMapProcess.containsKey(appProcessId)) {
            rp = new RunningProcess(appProcess.getCommand().split(" "),
                    appProcess.getProject().getPath(), log);
        } else {
            rp = idMapProcess.get(appProcessId);
            rp.start(appProcess.getCommand().split(" "),
                    appProcess.getProject().getPath(), log);
        }

        idMapProcess.put(appProcessId, rp);
    }


    @Override
    public void stop(Integer appProcessId) throws IOException {
        if (!idMapProcess.containsKey(appProcessId)) {
            return;
        }

        RunningProcess runningProcess = idMapProcess.get(appProcessId);
        runningProcess.getProcess().descendants().forEach(ProcessHandle::destroy);
        runningProcess.getProcess().destroy();
        runningProcess.setStatus("CLOSED");
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
        for (Integer appProcessStatusId : appProcessCreated.getAppProcessStatusIds()) {
            AppProcessStatus appProcessStatus =
                    appProcessStatusRepository.getReferenceById(appProcessStatusId);
            appProcess.add(appProcessStatus);
        }


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

        for (Integer appProcessStatusId : appProcessUpdated.getAppProcessStatusIds()) {
            AppProcessStatus appProcessStatus =
                    appProcessStatusRepository.getReferenceById(appProcessStatusId);
            appProcess.add(appProcessStatus);
        }

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
            boolean needCleanLog = false;

            if (!runningProcess.getProcess().isAlive()) {
                stop(appProcessId);
                continue;
            }
            String strLine;

            StringBuilder newStr = new StringBuilder();
            while ((strLine = runningProcess.getBr().readLine()) != null) {
                newStr.append(strLine);
                if (strLine.contains("Compiling ")) {
                    newStr = new StringBuilder(strLine);
                    runningProcess.setStatus("COMPILING");
                    needCleanLog = true;
                    continue;
                }

                Pattern pattern = Pattern.compile("\\berr(or)?\\b",
                        Pattern.CASE_INSENSITIVE);
                Matcher matcher = pattern.matcher(strLine);
                if (matcher.find()) {
                    runningProcess.setStatus("ERROR");
                    continue;
                }


                if (strLine.contains(" result: 200 200") || strLine.contains("api server started at") || strLine.contains(" message: 'start at ")) {
                    runningProcess.setStatus("SUCCESS");
                }
            }

            if (needCleanLog) {
                Files.writeString(Paths.get(getLogPath(appProcessId)), newStr);
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
