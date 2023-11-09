package com.cs.home.tag;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@Jacksonized
public class TagPayload {
    @NotBlank
    @Size(max = 50)
    String name;
}
