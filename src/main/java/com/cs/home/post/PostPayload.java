package com.cs.home.post;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Setter
@Builder
@Jacksonized
public class PostPayload {
    @Size(min = 1, max = 50)
    private String name;

    @Size(min = 1, max = 768)
    private String content;

    private Set<Integer> tags;

}
