package com.cs.home.appProcess;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class AppProcessCreated {

    @NotEmpty
    private String command;

    private String description;

    @NotNull
    private Integer projectId;

    @NotNull
    private Integer port;

}
