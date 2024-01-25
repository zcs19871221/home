package com.cs.home.frontEndProjects;

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
public class CreateFrontEndProjectPayload {
    @NotEmpty
    private String name;

    @NotNull
    @PathConstraint
    private Path path;

    @NotEmpty
    private String command;


}
