package com.cs.home.se;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Getter
@Setter
@Builder
@Jacksonized
public class SeUpdatePayload {
    private String name;

    private String path;

    private ServerType serverType;

    private String command;

    private Boolean baseServer;
    
}
