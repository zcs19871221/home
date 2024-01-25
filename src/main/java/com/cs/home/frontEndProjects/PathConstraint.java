package com.cs.home.frontEndProjects;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PathValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface PathConstraint {
    String message() default "File or directory not exists";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}