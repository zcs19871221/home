package com.cs.home.NodeServers;


import lombok.Getter;
import lombok.Setter;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;


@Getter
@Setter
public class ProcessInfo {
    private final Process process;
    private final NodeServer server;
    private final File logFile;
    private final FileInputStream readStream;
    private final BufferedReader br;
    private final Integer prevServerId;
    private final List<Integer> postServerIds;

    public String log = "";
    public NodeServerStatus status = NodeServerStatus.CLOSED;
    public Integer id;

    private String command;
    private String path;

    public ProcessInfo(Process process, NodeServer server, File logFile,
                       Integer prevServerId, List<Integer> postServerIds) throws FileNotFoundException {
        this.process = process;
        this.server = server;
        this.logFile = logFile;
        this.readStream = new FileInputStream(logFile);
        this.br = new BufferedReader(new InputStreamReader(this.readStream, StandardCharsets.UTF_8)
        );
        this.id = server.getId();
        this.prevServerId = prevServerId;
        this.postServerIds = postServerIds;
    }
}
