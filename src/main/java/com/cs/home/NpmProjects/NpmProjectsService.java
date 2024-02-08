package com.cs.home.NpmProjects;


import java.io.IOException;
import java.util.List;

public interface NpmProjectsService {

    NpmProjectResponse save(NpmProjectCreated npmProjectCreated);

    NpmProjectResponse update(NpmProjectUpdated npmProjectUpdated);

    void delete(Integer id);


    void vsCode(String target) throws IOException;

    List<NpmProjectResponse> list();

}
