package com.cs.home.dateTime;


public interface DateTimeService {
    SavedDateTimeResponse save(SaveDateTimePayload dateTime);

    QueriedDateTimeResponse get(Integer id);
}
