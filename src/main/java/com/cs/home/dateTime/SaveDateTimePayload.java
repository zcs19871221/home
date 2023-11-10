package com.cs.home.dateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

import javax.validation.constraints.NotNull;
import java.time.Instant;

@Getter
@Setter
@Builder
@Jacksonized
public class SaveDateTimePayload {
    @NotNull
    private Instant dateTime;
}
