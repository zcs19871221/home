package com.cs.home.NodeServers;

import lombok.Data;

import java.util.Set;


@Data
public class NodeServerResponse {

    private String command;

    private Integer port;

    private Set<NodeServerResponse> dependentNodeServers;

    private Integer npmProjectId;
}
