package com.cs.home.nodeServer;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface NodeServersService {
    NodeServerResponse create(NodeServerCreated nodeServerCreated) throws Exception;

    NodeServerResponse update(NodeServerUpdated nodeServerCreated) throws Exception;

    void delete(Integer nodeServerId) throws IOException;

    void start(Integer nodeServerId) throws IOException;

    void stop(Integer nodeServerId) throws IOException;

    void restart(Integer nodeServerId) throws IOException;

    Map<Integer, NodeServerRunningInfo> runningInfo() throws IOException;

    String logs(Integer nodeServerId) throws IOException;


    List<NodeServerResponse> list() throws Exception;


    void clearLog(Integer nodeServerId) throws IOException;

}
