package com.cs.home.NodeServers;

import lombok.Data;

import java.util.Set;


@Data
public class NodeServerResponse {

    private String command;

    private Integer port;

    private Set<NodeServerResponse> children;

    private Integer id;

    private Integer npmProjectId;

    private String portConfigFileRelativePath;

    //    @JsonDeserialize(using = CustomRegExpDeserializer.class)
    private String portReg;


}
