package com.cs.home.frontEndProjects;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private final String name;

    private final String path;

    private final Integer id;

    private final String command;

}
