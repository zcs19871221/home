package com.cs.home.NodeServers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface NodeServersService {
    NodeServerResponse createOrUpdate(NodeServerCreatedOrUpdated nodeServerCreatedOrUpdated) throws Exception;

    void delete(Integer nodeServerId);

    void startServer(Integer nodeServerId) throws IOException;

    void stopServer(Integer nodeServerId);

    void restartServer(Integer nodeServerId) throws IOException;

    Map<Integer, NodeServerRunningInfo> serverRunningInfos() throws IOException;

    List<NodeServerResponse> servers() throws Exception;

    NodeServerResponse fillThenMap(NodeServer nodeServer) throws Exception;


}
