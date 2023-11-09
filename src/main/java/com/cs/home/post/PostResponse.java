package com.cs.home.post;

import com.cs.home.tag.TagResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
public class PostResponse {
    private final String name;

    private final String content;

    private final Set<TagResponse> tags;

}
