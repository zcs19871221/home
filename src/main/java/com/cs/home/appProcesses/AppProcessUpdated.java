package com.cs.home.appProcesses;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class AppProcessUpdated {

    @NotEmpty
    private String command;

    private String description;

    @NotNull
    private Integer id;

    @NotNull
    private Integer projectId;

    @NotNull
    private Integer port;

}
