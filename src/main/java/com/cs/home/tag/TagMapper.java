package com.cs.home.tag;

import org.mapstruct.Mapper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Mapper
public interface TagMapper {
    Tag mapping(TagDto tagDto);


    TagDto mapping(Tag tagDto);

    List<TagDto> daoToDto(List<Tag> tags);

    List<Tag> mapping(List<TagDto> tags);


}
