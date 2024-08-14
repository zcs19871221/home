package com.cs.home.nodeServer;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class NodeServerCreated {

    @NotEmpty
    private String command;

    private String description;

    @NotNull
    private Integer npmProjectId;

    @NotNull
    private Integer port;

}
