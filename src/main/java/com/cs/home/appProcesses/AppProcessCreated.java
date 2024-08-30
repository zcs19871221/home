package com.cs.home.appProcesses;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
public class AppProcessCreated {

    @NotEmpty
    private String command;

    private String description;

    @NotNull
    private Integer projectId;

    private Integer port;

    private Set<Integer> appProcessStatusIds;

}
