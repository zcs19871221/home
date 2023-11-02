package com.cs.home.validate;

import com.cs.home.common.Response;
import javax.validation.Valid;
import javax.validation.constraints.Email;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequestMapping(path="/validate")
@RestController
public class ValidateController {

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Response<String> valid( @RequestBody
                                            ValidateRequestDto requestDto,
                                   @Valid @RequestParam @Email(message =
                                           "should be " +
                                           "a valid " +
                                           "email") String email)     {
        return Response.create("valid params: " + requestDto.getName());

    }
}
