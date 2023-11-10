package com.cs.home.tag;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper
public interface TagMapper {
    Tag mapping(TagPayload tagPayload);


    TagResponse mapping(Tag tag);

    List<TagResponse> mapping(List<Tag> tags);

    void updateEntity(TagPayload tagPayload, @MappingTarget Tag target);

}
