package com.cs.home.tag;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface TagMapper {
    Tag mapping(TagRequestDto tagRequestDto);
}
