package com.cs.home.project;

import com.cs.home.appProcess.AppProcessResponse;
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
