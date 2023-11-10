package com.cs.home.dateTime;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public QueriedDateTimeResponse get(Integer id) {
        return dateTimeMapper.mapping(dateTimeRepository.getReferenceById(id));
    }
}
