package com.cs.home.projects;

import com.cs.home.appProcesses.AppProcessResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectResponse {
    private Integer id;

    private String path;

    private String description;

    private Set<AppProcessResponse> appProcesses;
}
