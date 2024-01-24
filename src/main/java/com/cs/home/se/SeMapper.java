package com.cs.home.se;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface SeMapper {

    Se mapping(SeCreatePayload seCreatePayload);

    Se mapping(SeUpdatePayload seUpdatePayload);

    
    void updateSe(@MappingTarget Se dist, Se src);

    SeResponse mapping(Se se);

    List<SeResponse> mapping(List<Se> seList);

}

