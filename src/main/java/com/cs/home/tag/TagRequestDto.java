package com.cs.home.tag;


import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TagRequestDto {
    @NotBlank
    private String name;

    private Integer id;
}
