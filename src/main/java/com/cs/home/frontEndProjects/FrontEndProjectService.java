package com.cs.home.frontEndProjects;


import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface Service {

    Response save(CreatePayload postPayload);

    Response get(Integer id);

    List<Response> getAll();

    Response update(Integer id, SeUpdatePayload seUpdatePayload);

    void delete(Integer id);

    void getOrCreateSeProcess(Integer seId) throws IOException;

    void stopSeProcess(Integer seId);

    void vsCode(String target) throws IOException;

    void replaceFile(ReplacePayload replacePayload) throws IOException;

    Map<Integer, LogInfo> getLogs() throws IOException;

}
