package com.cs.home.appProcesses;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RunningProcessResponse {
    private Integer appProcessId;
    private String status;
}
