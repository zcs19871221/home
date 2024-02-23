package com.cs.home.NodeServers;


import lombok.Getter;

import java.io.*;


@Getter
public class ProcessInfo {
    private final Process process;
    private final NodeServer server;
    private final File logFile;
    private final FileInputStream readStream;
    private final BufferedReader br;
    public String log = "";
    public NodeServerStatus status = NodeServerStatus.CLOSED;
    public Integer id;


    public ProcessInfo(Process process, NodeServer server, File logFile) throws FileNotFoundException {
        this.process = process;
        this.server = server;
        this.logFile = logFile;
        this.readStream = new FileInputStream(logFile);
        this.br = new BufferedReader(new InputStreamReader(this.readStream));
        this.id = server.getId();

    }
}
