package com.cs.home.frontEndProjects;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.nio.file.Files;
import java.nio.file.Path;

public class PathValidator implements
        ConstraintValidator<PathConstraint, Path> {


    @Override
    public boolean isValid(Path path,
                           ConstraintValidatorContext cxt) {
        return Files.exists(path);
    }

}