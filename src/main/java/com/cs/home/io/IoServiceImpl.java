package com.cs.home.io;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class IoServiceImpl implements IoService {

    @Override
    public String read(String path) throws IOException {
        return Files.readString(Paths.get(path));
    }

    @Override
    public void write(String path, String content) throws IOException {
        write(Paths.get(path), content);
    }

    @Override
    public void write(Path path, String content) throws IOException {
        Files.writeString(path, content);
    }

    @Override
    public Process run(String command) throws Exception {
        return Runtime.getRuntime().exec(command);
    }
}
