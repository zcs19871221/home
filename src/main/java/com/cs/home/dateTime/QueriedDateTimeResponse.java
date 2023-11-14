package com.cs.home.dateTime;

import lombok.Data;

import java.time.Instant;
import java.time.ZoneId;

@Data
public class QueriedDateTimeResponse {

    private Instant dateTime;

    private Integer id;

    private String formattedTime;

    private ZoneId zoneId;
}
