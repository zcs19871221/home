package com.cs.home.nodeServer;


import lombok.Getter;
import lombok.Setter;

import java.io.*;
import java.nio.charset.StandardCharsets;


@Getter
@Setter
public class ProcessInfo {
    private final Process process;
    private final NodeServer server;
    private final File logFile;
    private final FileInputStream readStream;
    private final BufferedReader br;

    private NodeServerStatus status = NodeServerStatus.CLOSED;
    private Integer id;

    private String command;
    private String path;

    public ProcessInfo(Process process, NodeServer server, File logFile
    ) throws FileNotFoundException {
        this.process = process;
        this.server = server;
        this.logFile = logFile;
        this.readStream = new FileInputStream(logFile);
        this.br = new BufferedReader(new InputStreamReader(this.readStream, StandardCharsets.UTF_8)
        );
        this.id = server.getId();
    }
}
