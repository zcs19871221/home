package com.cs.home.NodeServers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface NodeServersService {
    NodeServerResponse createOrUpdate(NodeServerCreatedOrUpdated nodeServerCreatedOrUpdated) throws Exception;

    void delete(Integer nodeServerId) throws IOException;

    void startServer(Integer nodeServerId) throws IOException;

    void stopServer(Integer nodeServerId) throws IOException;

    void restartServer(Integer nodeServerId) throws IOException;

    Map<Integer, NodeServerRunningInfo> serverRunningInfos() throws IOException;

    List<NodeServerResponse> servers() throws Exception;

    NodeServerResponse map(NodeServer nodeServer) throws Exception;


    List<NodeServerResponse> createOrUpdateList(List<NodeServerCreatedOrUpdated> nodeServerCreatedOrUpdatedList) throws Exception;

    void clearLog(Integer nodeServerId) throws IOException;

    void changePort(Integer nodeServerId, Integer port) throws IOException;


}
