package com.cs.home.NpmProjects;

import com.cs.home.common.PathConstraint;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.nio.file.Path;

@Getter
@Setter
@Builder
@Jacksonized
public class NpmProjectCreated {
    @NotEmpty
    private String name;

    @NotNull
    @PathConstraint
    private Path path;

}
