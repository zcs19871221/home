package com.cs.home.appProcesses;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.*;
import java.nio.charset.StandardCharsets;


@RequiredArgsConstructor
@Getter
@Setter
public class RunningProcess {
    private final FileInputStream fileInputStream;
    private final BufferedReader br;
    private Process process;
    private ProcessBuilder pb;
    private String status;
    private String color;

    RunningProcess(String[] commands, String cwd, File log) throws IOException {

        start(commands, cwd, log);
        fileInputStream = new FileInputStream(log);
        br = new BufferedReader(new InputStreamReader(fileInputStream,
                StandardCharsets.UTF_8)
        );
    }

    public void start(String[] commands, String cwd, File log) throws IOException {
        pb = new ProcessBuilder(commands);
        pb.directory(new File(cwd));
        pb.redirectErrorStream(true);
        pb.redirectOutput(log);
        process = pb.start();
        status = "RUNNING";
    }
}
