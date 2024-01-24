package com.cs.home.se;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@Jacksonized
public class SeCreatePayload {
    @NotEmpty
    private String name;

    @NotEmpty
    private String path;

    @NotNull
    private ServerType serverType;

    @NotEmpty
    private String command;
    
    private Boolean baseServer;

}
