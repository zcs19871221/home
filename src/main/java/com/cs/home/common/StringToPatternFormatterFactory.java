package com.cs.home.common;

import org.springframework.format.AnnotationFormatterFactory;
import org.springframework.format.Parser;
import org.springframework.format.Printer;

import java.util.Set;
import java.util.regex.Pattern;

public final class StringToPatternFormatterFactory
        implements AnnotationFormatterFactory<StringToPattern> {

    public Set<Class<?>> getFieldTypes() {
        return Set.of(Pattern.class);
    }

    public Printer<?> getPrinter(StringToPattern annotation, Class<?> fieldType) {
        return new StringToPatternFormatter();
    }

    public Parser<?> getParser(StringToPattern annotation, Class<?> fieldType) {
        return new StringToPatternFormatter();
    }


}