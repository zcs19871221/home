package com.cs.home.tag;


import com.cs.home.common.AuditableResponse;
import com.cs.home.post.PostResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TagResponse extends AuditableResponse {
    private Integer id;

    private String name;

    private Set<PostResponse> posts;
}
