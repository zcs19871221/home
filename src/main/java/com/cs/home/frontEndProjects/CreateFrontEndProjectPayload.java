package com.cs.home.frontEndProjects;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Builder
@Jacksonized
public class CreatePayload {
    @NotEmpty
    private String name;

    @NotEmpty
    private String path;


    @NotEmpty
    private String command;


}
