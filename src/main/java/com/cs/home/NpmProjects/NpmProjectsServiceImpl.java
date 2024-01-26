package com.cs.home.NpmProjects;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NpmProjectsServiceImpl implements NpmProjectsService {

    private final NpmProjectsRepository npmProjectsRepository;
    private final NpmProjectMapper npmProjectMapper;


    @Override
    @Transactional
    public NpmProjectResponse save(NpmProjectCreated createFrontEndProjectPayload) {

        NpmProject project =
                npmProjectMapper.map(createFrontEndProjectPayload);

        return npmProjectMapper.map(npmProjectsRepository.save(project));
    }


    @Override
    public NpmProjectResponse update(Integer id,
                                     NpmProjectUpdated npmProjectUpdated) {
        NpmProject existingPost = npmProjectsRepository.getReferenceById(id);

        npmProjectMapper.updateNpmProject(existingPost, npmProjectMapper.map(npmProjectUpdated));

        return npmProjectMapper.map(npmProjectsRepository.save(existingPost));
    }

    @Override
    public void delete(Integer id) {
        npmProjectsRepository.deleteById(id);
    }

    public void vsCode(String target) throws IOException {
        ProcessBuilder p = new ProcessBuilder("code.cmd", target);
        p.start();
    }

    @Override
    public List<NpmProjectResponse> list() {
        return npmProjectMapper.map(npmProjectsRepository.findAll());
    }

}
