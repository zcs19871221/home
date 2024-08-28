package com.cs.home.appProcesses;

import com.cs.home.projects.ProjectResponse;
import lombok.Data;


@Data
public class AppProcessResponse {
    private Integer id;

    private String command;

    private String description;

    private ProjectResponse project;

    private Integer port;
}
