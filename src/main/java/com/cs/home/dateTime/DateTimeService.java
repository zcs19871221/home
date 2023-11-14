package com.cs.home.dateTime;


import java.time.ZoneId;

public interface DateTimeService {
    SavedDateTimeResponse save(SaveDateTimePayload dateTime);

    QueriedDateTimeResponse get(Integer id, ZoneId zoneId);
}
