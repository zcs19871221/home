package com.cs.home.tag;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class TagResponse {
    Integer id;

    String name;

    OffsetDateTime createdAt;
}
