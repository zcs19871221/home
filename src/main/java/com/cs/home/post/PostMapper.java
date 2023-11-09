package com.cs.home.post;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy =
        ReportingPolicy.IGNORE)
public interface PostMapper {

    @Mapping(target = "tags", expression = "java(new java.util.HashSet<>())")
    Post mapping(PostPayload postPayload);

    PostResponse mapping(Post post);

}

