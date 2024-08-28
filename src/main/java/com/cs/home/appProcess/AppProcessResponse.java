package com.cs.home.appProcess;

import com.cs.home.project.ProjectResponse;
import lombok.Data;


@Data
public class AppProcessResponse {
    private Integer id;

    private String command;

    private String description;

    private ProjectResponse project;

    private Integer port;
}
