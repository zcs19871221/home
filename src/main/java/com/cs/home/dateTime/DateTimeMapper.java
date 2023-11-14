package com.cs.home.dateTime;

import org.mapstruct.Mapper;

@Mapper
public interface DateTimeMapper {
    DateTime mapping(SaveDateTimePayload saveDateTimePayload);

    QueriedDateTimeResponse mapping(DateTime dateTime);

    SavedDateTimeResponse mappingToSavedDateTimeResponse(DateTime dateTime);


}
