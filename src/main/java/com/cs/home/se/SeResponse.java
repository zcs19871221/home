package com.cs.home.se;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SeResponse {
    private final String name;

    private final String path;

    private final ServerType serverType;

    private final Integer id;

    private final String command;

}
