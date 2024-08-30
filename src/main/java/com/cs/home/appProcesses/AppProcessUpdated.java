package com.cs.home.appProcesses;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Data
public class AppProcessUpdated {

    @NotEmpty
    private String command;

    private String description;

    @NotNull
    private Integer id;

    @NotNull
    private Integer projectId;

    private Integer port;

    private Set<Integer> appProcessStatusIds = new HashSet<>();

}
