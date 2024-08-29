package com.cs.home.projects;


import java.io.IOException;
import java.util.List;

public interface ProjectService {

    ProjectResponse save(ProjectCreated npmProjectCreated) throws Exception;

    ProjectResponse update(ProjectUpdated npmProjectUpdated) throws Exception;

    void delete(Integer id) throws Exception;

    List<ProjectResponse> list() throws Exception;


}
