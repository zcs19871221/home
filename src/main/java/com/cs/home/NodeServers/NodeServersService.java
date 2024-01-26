package com.cs.home.NodeServers;

import java.io.IOException;

public interface NodeServersService {
    NodeServerResponse save(NodeServerCreated nodeServerCreated);

    NodeServerResponse update(Integer nodeServerId,
                              NodeServerUpdated nodeServerUpdated);

    void delete(Integer id);

    void startServer(Integer id) throws IOException;

    void stopServer(Integer id);

    Integer getPort(String path) throws Exception;

}
