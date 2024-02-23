package com.cs.home.NodeServers;

import lombok.Data;

import java.util.Set;


@Data
public class NodeServerResponse {

    private String command;

    private String name;

    private Integer port;

    private Set<Integer> postServerIds;

    private Integer prevServerId;

    private Integer id;

    private Integer npmProjectId;

    private String portConfigFileRelativePath;

    //    @JsonDeserialize(using = CustomRegExpDeserializer.class)
    private String portReg;


}
