package com.cs.home.project;


import java.io.IOException;
import java.util.List;

public interface ProjectService {

    ProjectResponse save(ProjectCreated npmProjectCreated) throws Exception;

    ProjectResponse update(ProjectUpdated npmProjectUpdated) throws Exception;

    void delete(Integer id) throws Exception;


    void vsCode(String target) throws IOException;

    List<ProjectResponse> list() throws Exception;

    void openNpmProject(Integer npmProjectId) throws IOException;

    void locateErrorWithVscode(String path) throws IOException;

}
