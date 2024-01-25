package com.cs.home.frontEndProjects;


import org.springframework.format.Formatter;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.util.Locale;

public class PathFormatter implements Formatter<Path> {
    @Override
    public Path parse(String text, Locale locale) throws ParseException {
        return Paths.get(text);
    }

    @Override
    public String print(Path path, Locale locale) {
        return path.normalize().toString();
    }
}