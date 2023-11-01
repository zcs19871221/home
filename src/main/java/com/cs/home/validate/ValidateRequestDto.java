package com.cs.home.validate;

import javax.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ValidateRequestDto {
    @NotBlank
    private String name;

}
