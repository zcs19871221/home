package com.cs.home;

import com.cs.home.common.Response;
import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ConstraintViolationException;
import java.util.Locale;

@ControllerAdvice
@AllArgsConstructor
@RestController
public class ErrorHandler {
    private MessageSource messageSource;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<String> handleInvalidException(MethodArgumentNotValidException ex, Locale locale) {
        String message = ex.getFieldErrors().stream()
                .map(e ->  messageSource.getMessage("showFieldInvalidMessage"
                        , new String[]{e.getField(), e.getDefaultMessage()},
                        locale) + "\n")
                .reduce(messageSource.getMessage("notValidArgument", null,
                        locale) + "\n", String::concat);

        return Response.create(message);

    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<String> handleConstraintViolationException(ConstraintViolationException ex, Locale locale) {
        return Response.create(ex.getLocalizedMessage());

    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Response<String> handleException(Exception ex) {
        return Response.create(ex.getLocalizedMessage());
    }
}
