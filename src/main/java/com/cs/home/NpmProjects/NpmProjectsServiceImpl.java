package com.cs.home.NpmProjects;


import com.cs.home.NodeServers.NodeServer;
import com.cs.home.NodeServers.NodeServerResponse;
import com.cs.home.NodeServers.NodeServersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NpmProjectsServiceImpl implements NpmProjectsService {

    private final NpmProjectsRepository npmProjectsRepository;
    private final NodeServersService nodeServersService;
    private final NpmProjectMapper npmProjectMapper;


    private NpmProjectResponse map(NpmProject npmProject) throws Exception {
        NpmProjectResponse npmProjectResponse =
                npmProjectMapper.map((npmProject));
        if (npmProject.getNodeServers() != null) {
            Set<NodeServerResponse> nodeServerResponses = new HashSet<>();
            for (NodeServer nodeServer : npmProject.getNodeServers()) {
                nodeServerResponses.add(nodeServersService.fillThenMap(nodeServer));
            }
            npmProjectResponse.setNodeServers(nodeServerResponses);
        }
        return npmProjectResponse;
    }

    @Override
    @Transactional
    public NpmProjectResponse save(NpmProjectCreated createFrontEndProjectPayload) throws Exception {

        NpmProject project =
                npmProjectMapper.map(createFrontEndProjectPayload);
        npmProjectsRepository.save(project);
        return map(project);
    }

    @Override
    @Transactional
    public NpmProjectResponse update(NpmProjectUpdated npmProjectUpdated) throws Exception {
        NpmProject npmProject =
                npmProjectsRepository.getReferenceById(npmProjectUpdated.getId());

        npmProjectMapper.updateNpmProject(npmProject,
                npmProjectMapper.map(npmProjectUpdated));
        npmProjectsRepository.save(npmProject);
        return map(npmProject);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
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

        vsCode(path);
    }

    @Override
    public List<NpmProjectResponse> list() throws Exception {
        List<NpmProject> npmProjects = npmProjectsRepository.findAll();

        return npmProjects.stream().map(npmProject -> {
            try {
                return map(npmProject);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }

}
