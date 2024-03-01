package com.cs.home.common;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PathValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface PathExists {
    String message() default "File or directory not exists";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}