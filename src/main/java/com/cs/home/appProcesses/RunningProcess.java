package com.cs.home.appProcesses;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.BufferedReader;
import java.io.FileInputStream;


@RequiredArgsConstructor
@Getter
@Setter
public class RunningProcess {
    private final Process process;
    private final FileInputStream fileInputStream;
    private final BufferedReader br;
    private final Integer appProcessId;
    private String status;
    private String color;
}
