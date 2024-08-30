package com.cs.home.appProcessStatus;

import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AppProcessStatusMapper {

    AppProcessStatus map(AppProcessStatusCreated appProcessStatusCreated);


    AppProcessStatus map(AppProcessStatusUpdated appProcessStatusUpdated);

    AppProcessStatusResponse map(AppProcessStatus appProcessStatus);

    List<AppProcessStatusResponse> map(List<AppProcessStatus> appProcessStatuses);
}
