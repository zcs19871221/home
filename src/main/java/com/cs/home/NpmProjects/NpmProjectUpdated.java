package com.cs.home.NpmProjects;

import com.cs.home.common.PathExists;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import javax.validation.constraints.NotNull;
import java.nio.file.Path;

@Getter
@Setter
@Builder
@Jacksonized
public class NpmProjectUpdated {
    @NotNull
    private Integer id;
    
    @NotNull
    @PathExists
    private Path path;
}
