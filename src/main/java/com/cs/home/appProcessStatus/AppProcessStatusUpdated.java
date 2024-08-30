package com.cs.home.appProcessStatus;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class AppProcessStatusUpdated {

    @NotNull
    private Integer id;

    @NotEmpty
    private String matcher;

    @NotEmpty
    private String name;

    @NotEmpty
    private String color;

}
