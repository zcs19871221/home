package com.cs.home.dateTime;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class SavedDateTimeResponse {
    private final String dateTime;
    private final Integer id;
}
