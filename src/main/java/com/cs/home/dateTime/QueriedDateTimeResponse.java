package com.cs.home.dateTime;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.ZoneId;

@Getter
@Setter
@RequiredArgsConstructor
public class QueriedDateTimeResponse {

    private final Instant time;
    private final Integer id;
    private final String zonedDateTime;
    private ZoneId zoneId;
}
