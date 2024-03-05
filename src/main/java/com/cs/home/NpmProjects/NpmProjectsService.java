package com.cs.home.NpmProjects;


import java.io.IOException;
import java.util.List;

public interface NpmProjectsService {

    NpmProjectResponse save(NpmProjectCreated npmProjectCreated) throws Exception;

    NpmProjectResponse update(NpmProjectUpdated npmProjectUpdated) throws Exception;

    void delete(Integer id) throws IOException;


    void vsCode(String target) throws IOException;

    List<NpmProjectResponse> list() throws Exception;

    void openNpmProject(Integer npmProjectId) throws IOException;

    void locateErrorWithVscode(String path) throws IOException;

}
