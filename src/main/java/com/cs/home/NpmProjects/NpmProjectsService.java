package com.cs.home.NpmProjects;


import java.io.IOException;
import java.util.List;

public interface NpmProjectsService {

    NpmProjectResponse save(NpmProjectCreated postPayload);

    NpmProjectResponse update(Integer id,
                              NpmProjectUpdated seUpdatePayload);

    void delete(Integer id);


    void vsCode(String target) throws IOException;

    List<NpmProjectResponse> list();

}
