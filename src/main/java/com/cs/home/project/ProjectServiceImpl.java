package com.cs.home.project;


import com.cs.home.appProcess.AppProcessService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService {

    private final ProjectsRepository projectsRepository;
    private final AppProcessService appProcessService;
    private final ProjectMapper projectMapper;


    @Override
    @Transactional
    public ProjectResponse save(ProjectCreated createFrontEndProjectPayload) {

        Project npmProject =
                projectMapper.map(createFrontEndProjectPayload);
        projectsRepository.save(npmProject);
        return projectMapper.map(npmProject);
    }

    @Override
    @Transactional
    public ProjectResponse update(ProjectUpdated projectUpdated) throws Exception {
        Project npmProject =
                projectsRepository.getReferenceById(projectUpdated.getId());

        projectMapper.updateNpmProject(npmProject,
                projectMapper.map(projectUpdated));
        projectsRepository.save(npmProject);
        return projectMapper.map(npmProject);
    }

    @Override
    @Transactional
    public void delete(Integer id) throws Exception {
        appProcessService.stop(id);
        projectsRepository.deleteById(id);
    }


    public void vsCode(String target) throws IOException {
        ProcessBuilder p = new ProcessBuilder("code.cmd", target);
        p.start();
    }


    public void openNpmProject(Integer npmProjectId) throws IOException {
        Project npmProject =
                projectsRepository.getReferenceById(npmProjectId);
        String path = URLDecoder.decode(npmProject.getPath(), StandardCharsets.UTF_8);

        ProcessBuilder p = new ProcessBuilder("code.cmd", path);
        p.start();
    }

    @Override
    public void locateErrorWithVscode(String path) throws IOException {
        ProcessBuilder p = new ProcessBuilder("code.cmd", "-g", path);
        p.start();
    }

    @Override
    public List<ProjectResponse> list() throws Exception {
        List<Project> npmProjects = projectsRepository.findAll();

        return npmProjects.stream().map(npmProject -> {
            try {
                return projectMapper.map(npmProject);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }

}
