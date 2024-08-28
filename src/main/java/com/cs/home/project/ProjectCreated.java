package com.cs.home.project;

import com.cs.home.common.Directory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@Jacksonized
public class ProjectCreated {
    @NotNull
    @Directory
    private String path;

    private String description;

}
