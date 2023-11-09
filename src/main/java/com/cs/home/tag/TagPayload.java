package com.cs.home.tag;


import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class TagPayload {
    @NotBlank
    @Size(max = 50)
    String name;
}
