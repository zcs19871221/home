package com.cs.home.npmProject;


import com.cs.home.nodeServer.NodeServersService;
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
public class NpmProjectsServiceImpl implements NpmProjectsService {

    private final NpmProjectsRepository npmProjectsRepository;
    private final NodeServersService nodeServersService;
    private final NpmProjectMapper npmProjectMapper;


    @Override
    @Transactional
    public NpmProjectResponse save(NpmProjectCreated createFrontEndProjectPayload) {

        NpmProject npmProject =
                npmProjectMapper.map(createFrontEndProjectPayload);
        npmProjectsRepository.save(npmProject);
        return npmProjectMapper.map(npmProject);
    }

    @Override
    @Transactional
    public NpmProjectResponse update(NpmProjectUpdated npmProjectUpdated) throws Exception {
        NpmProject npmProject =
                npmProjectsRepository.getReferenceById(npmProjectUpdated.getId());

        npmProjectMapper.updateNpmProject(npmProject,
                npmProjectMapper.map(npmProjectUpdated));
        npmProjectsRepository.save(npmProject);
        return npmProjectMapper.map(npmProject);
    }

    @Override
    @Transactional
    public void delete(Integer id) throws IOException {
        nodeServersService.stop(id);
        npmProjectsRepository.deleteById(id);
    }


    public void vsCode(String target) throws IOException {
        ProcessBuilder p = new ProcessBuilder("code.cmd", target);
        p.start();
    }


    public void openNpmProject(Integer npmProjectId) throws IOException {
        NpmProject npmProject =
                npmProjectsRepository.getReferenceById(npmProjectId);
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
    public List<NpmProjectResponse> list() throws Exception {
        List<NpmProject> npmProjects = npmProjectsRepository.findAll();

        return npmProjects.stream().map(npmProject -> {
            try {
                return npmProjectMapper.map(npmProject);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }

}
