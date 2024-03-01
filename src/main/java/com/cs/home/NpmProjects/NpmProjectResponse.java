package com.cs.home.NpmProjects;

import com.cs.home.NodeServers.NodeServerResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NpmProjectResponse {

    private final String path;

    private final Integer id;

    private Set<NodeServerResponse> nodeServers;

    private String errorMsg;

}
