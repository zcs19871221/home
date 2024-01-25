package com.cs.home.frontEndProjects;


import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface FrontEndProjectService {

    FrontEndProjectResponse save(CreateFrontEndProjectPayload postPayload);

    List<FrontEndProjectResponse> getAll() throws Exception;

    FrontEndProjectResponse update(Integer id, UpdateFrontEndProjectPayload seUpdatePayload);

    void delete(Integer id);

    void getOrStartFrontEndServer(Integer seId) throws IOException;

    void stopFrontEndServer(Integer seId);

    void vsCode(String target) throws IOException;

    Map<Integer, FrontEndServerLog> getLogs() throws IOException;

    Integer getPort(String path) throws Exception;

    void changePort(Integer id, Integer port) throws Exception;
}
