package com.cs.home.nodeServer;

import com.cs.home.npmProject.NpmProjectResponse;
import lombok.Data;


@Data
public class NodeServerResponse {
    private Integer id;

    private String command;

    private String description;

    private NpmProjectResponse npmProject;

    private Integer port;
}
