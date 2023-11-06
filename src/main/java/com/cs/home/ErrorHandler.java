package com.cs.home;

import com.cs.home.common.Response;
import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ConstraintViolationException;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public Response<String> handleDBViolationException(DataIntegrityViolationException ex,  Locale locale) {
        Pattern p = Pattern.compile("constraint \\[[^.]+.[^_]+_([^_]+)" +
                "_unique]");
        Matcher matcher = p.matcher(ex.getMessage() == null ? "" : ex.getMessage());
        if (matcher.find()) {
            return   Response.create(messageSource.getMessage(
                    "valueOfXExists",
                    new String[]{matcher.group(1)}, locale));
        }
        return Response.create(ex.getLocalizedMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Response<String> handleException(Exception ex) {
        return Response.create(ex.getLocalizedMessage());
    }
}
