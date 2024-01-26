package com.cs.home.NodeServers;


import lombok.AllArgsConstructor;

import java.io.File;

@AllArgsConstructor
class ProcessInfo {
    Process process;
    NodeServer server;
    File log;
}
