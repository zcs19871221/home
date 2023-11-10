package com.cs.home.dateTime;

import org.mapstruct.Mapper;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Mapper
public interface DateTimeMapper {
    DateTime mapping(SaveDateTimePayload saveDateTimePayload);

    QueriedDateTimeResponse mapping(DateTime dateTime);

    SavedDateTimeResponse mappingToSavedDateTimeResponse(DateTime dateTime);

    default OffsetDateTime instantToOffsetDateTime(Instant instant) {
        return instant.atOffset(ZoneOffset.UTC);
    }


}
