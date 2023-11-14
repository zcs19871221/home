package com.cs.home.dateTime;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@RequiredArgsConstructor
public class SavedDateTimeResponse {
    private final Instant dateTime;
    private final Integer id;
}
