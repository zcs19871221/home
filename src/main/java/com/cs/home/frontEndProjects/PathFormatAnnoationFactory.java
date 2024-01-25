package com.cs.home.frontEndProjects;


import org.springframework.format.AnnotationFormatterFactory;
import org.springframework.format.Parser;
import org.springframework.format.Printer;

import java.nio.file.Path;
import java.util.Set;

public class PathFormatAnnoationFactory implements
        AnnotationFormatterFactory<PathFormat> {

    @Override
    public Set<Class<?>> getFieldTypes() {
        return Set.of(Path.class);
    }

    @Override
    public Printer<?> getPrinter(PathFormat annotation, Class<?> fieldType) {
        return new PathFormatter();
    }

    @Override
    public Parser<?> getParser(PathFormat annotation, Class<?> fieldType) {
        return new PathFormatter();
    }
}