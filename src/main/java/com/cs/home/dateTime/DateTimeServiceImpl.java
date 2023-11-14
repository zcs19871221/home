package com.cs.home.dateTime;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class DateTimeServiceImpl implements DateTimeService {

    private final DateTimeRepository dateTimeRepository;

    private final DateTimeMapper dateTimeMapper;

    public SavedDateTimeResponse save(SaveDateTimePayload saveDateTimePayload) {
        DateTime dateTime = dateTimeMapper.mapping(saveDateTimePayload);
        dateTimeRepository.save(dateTime);
        return dateTimeMapper.mappingToSavedDateTimeResponse(dateTime);
    }

    public QueriedDateTimeResponse get(Integer id, ZoneId zoneId) {
        DateTime dateTime = dateTimeRepository.getReferenceById(id);
        QueriedDateTimeResponse q = dateTimeMapper.mapping(dateTime);
        q.setZoneId(zoneId);
        return q;
    }
}
