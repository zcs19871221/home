package com.cs.home.NodeServers;

import java.util.Set;

public class NodeServerResponse {

    private String command;

    private Integer port;

    private Set<NodeServerResponse> dependentNodeServers;

    private Integer npmProjectId;
}
