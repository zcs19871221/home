package com.cs.home.post;

import lombok.Data;

import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class PostPayload {
    @Size(min = 1, max = 50)
    private String name;

    @Size(min = 1, max = 768)
    private String content;

    private Set<Integer> tags;

}
