package com.cs.home.validate;

import com.cs.home.common.Response;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequestMapping(path="/validate")
@RestController
public class ValidateController {

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Response<String> valid(@Valid @RequestBody
                                            ValidateRequestDto requestDto) {
        return Response.create("valid params: " + requestDto.getName());

    }
}
