package com.cs.home.tag;

import com.cs.home.post.Post;
import com.cs.home.post.PostResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper
public interface TagMapper {
    Tag mapping(TagPayload tagPayload);

    @Mapping(target = "tags", ignore = true)
    PostResponse mapping(Post post);

    @Mapping(target = "posts", source = "posts")
    List<TagResponse> mapping(List<Tag> tags);

    TagResponse mapping(Tag tag);

    void updateTag(TagPayload tagPayload, @MappingTarget Tag target);

}
