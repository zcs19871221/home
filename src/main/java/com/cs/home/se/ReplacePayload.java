package com.cs.home.se;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class ReplacePayload {
    @NotEmpty
    private String file;
    @NotEmpty
    private String source;
    @NotEmpty
    private String target;
}
