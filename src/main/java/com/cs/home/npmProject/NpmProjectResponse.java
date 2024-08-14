package com.cs.home.npmProject;

import com.cs.home.nodeServer.NodeServerResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NpmProjectResponse {
    private Integer id;

    private String path;

    private String description;

    private Set<NodeServerResponse> nodeServers;
}
