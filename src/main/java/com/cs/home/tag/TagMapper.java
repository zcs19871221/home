package com.cs.home.tag;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper
public interface TagMapper {
    Tag mapping(TagDto tagDto);


    TagDto mapping(Tag tagDto);

    List<TagDto> mapping(List<Tag> tags);

    void updateEntity(Tag tag, @MappingTarget Tag target);

}
