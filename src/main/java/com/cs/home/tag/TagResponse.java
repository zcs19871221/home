package com.cs.home.tag;


import com.cs.home.common.AuditableResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TagResponse extends AuditableResponse {
    private Integer id;

    private String name;
}
