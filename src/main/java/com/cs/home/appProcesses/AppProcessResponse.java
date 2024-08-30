package com.cs.home.appProcesses;

import com.cs.home.appProcessStatus.AppProcessStatusResponse;
import com.cs.home.projects.ProjectResponse;
import lombok.Data;

import java.util.List;


@Data
public class AppProcessResponse {
    private Integer id;

    private String command;

    private String description;

    private ProjectResponse project;

    private Integer port;

    private List<AppProcessStatusResponse> appProcessStatusResponses;

}
