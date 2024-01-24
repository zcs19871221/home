package com.cs.home.se;


import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface SeService {

    SeResponse save(SeCreatePayload postPayload);

    SeResponse get(Integer id);

    List<SeResponse> getAll();

    SeResponse update(Integer id, SeUpdatePayload seUpdatePayload);

    void delete(Integer id);

    void getOrCreateSeProcess(Integer seId) throws IOException;

    void stopSeProcess(Integer seId);

    void vsCode(String target) throws IOException;

    void replaceFile(ReplacePayload replacePayload) throws IOException;

    Map<Integer, LogInfo> getLogs() throws IOException;

}
