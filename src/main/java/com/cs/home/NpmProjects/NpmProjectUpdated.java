package com.cs.home.NpmProjects;

import com.cs.home.common.PathConstraint;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;
import org.springframework.format.annotation.NumberFormat;

import java.nio.file.Path;

@Getter
@Setter
@Builder
@Jacksonized
public class NpmProjectUpdated {
    private String name;

    @PathConstraint
    private Path path;

    @NumberFormat
    private Integer port;

    private String command;
}
