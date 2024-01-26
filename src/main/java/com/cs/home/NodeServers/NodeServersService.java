package com.cs.home.NodeServers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface NodeServersService {
    NodeServerResponse save(NodeServerCreated nodeServerCreated) throws Exception;

    NodeServerResponse update(Integer nodeServerId,
                              NodeServerUpdated nodeServerUpdated) throws Exception;

    void delete(Integer nodeServerId);

    void startServer(Integer nodeServerId) throws IOException;

    void stopServer(Integer nodeServerId);

    void restartServer(Integer nodeServerId) throws IOException;

    Map<Integer, NodeServerRunningInfo> serverRunningInfos() throws IOException;

    List<NodeServerResponse> servers() throws Exception;


}
