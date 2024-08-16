package com.cs.home.io;

import java.io.IOException;
import java.nio.file.Path;

public interface IoService {
    String read(String path) throws Exception;

    void write(String path, String content) throws Exception;

    void write(Path path, String content) throws IOException;

    Process run(String command) throws Exception;
}
