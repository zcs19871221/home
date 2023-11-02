package com.cs.home.post;

import com.cs.home.common.ValidationGroup;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Data
public class PostDto {
    @NotBlank
    private String postName;

    @NotNull(groups = {ValidationGroup.Update.class})
    private String postId;

    private Set<Integer> tags;

}
