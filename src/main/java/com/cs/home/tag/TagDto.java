package com.cs.home.tag;


import com.cs.home.common.ValidationGroup;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class TagDto {
    @NotBlank
    @Size(max = 50)
    private String name;

    @NotNull(groups = {ValidationGroup.Update.class})
    private Integer id;
}
