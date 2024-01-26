package com.cs.home.NodeServers;

import lombok.Data;

import java.util.Set;

@Data
public class NodeServerCreated {

    private String command;

    private Set<Integer> dependentNodeServers;

    private Integer npmProjectId;
}
