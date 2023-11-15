package com.cs.home.post;

import com.cs.home.common.AuditableResponse;
import com.cs.home.tag.TagResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostResponse extends AuditableResponse {
    private final String name;

    private final String content;

    private final Set<TagResponse> tags;

    private final Integer id;

}
