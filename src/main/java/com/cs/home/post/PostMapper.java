package com.cs.home.post;

import com.cs.home.tag.Tag;
import com.cs.home.tag.TagResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy =
        ReportingPolicy.IGNORE)
public interface PostMapper {

    @Mapping(target = "tags", expression = "java(new java.util.HashSet<>())")
    Post mapping(PostPayload postPayload);

    PostResponse mapping(Post post);

    @Mapping(target = "posts", ignore = true)
    TagResponse mapping(Tag tag);

    @Mapping(target = "tags", ignore = true)
    void updatePost(PostPayload postPayload, @MappingTarget Post target);


}

