package com.cs.home.tag;


import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TagDto {
    @NotBlank
    private String name;

    private Integer id;
}
