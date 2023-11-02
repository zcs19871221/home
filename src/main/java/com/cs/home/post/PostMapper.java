package com.cs.home.post;

import com.cs.home.tag.Tag;
import org.mapstruct.Mapper;

import java.util.HashSet;
import java.util.Set;

@Mapper
public interface PostMapper {

    Post mapping(PostDto postDto);

    PostDto mapping(Post post);

    default Set<Tag> TagIdToTags(Set<Integer> tags) {
        Set<Tag> ans = new HashSet<>();
        for (Integer tagId : tags) {
            Tag tag = new Tag();
            tag.setId(tagId);
            ans.add(tag);
        }
        return ans;
    }

    default Set<Integer> TagsToTagId(Set<Tag> tags) {
        Set<Integer> ans = new HashSet<>();
        for (Tag tag : tags) {
            ans.add(tag.getId());
        }
        return ans;
    }


}
