package com.cs.home.post;

import com.cs.home.common.ValidationGroup;
import com.cs.home.tag.TagDto;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class PostDto {
    @Size(min = 1, max = 50)
    private String name;

    @NotNull(groups = {ValidationGroup.Update.class})
    private int id;

    @Size(min = 1, max = 768)
    private String content;

    private Set<TagDto> tags;

}
