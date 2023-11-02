package com.cs.home.post;

import com.cs.home.tag.Tag;
import com.cs.home.tag.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final TagService tagService;
    private final PostMapper postMapper;

    @Override
    @Transactional
    public PostDto save(PostDto postDto) {

        Post post = postMapper.mapping(postDto);
        Set<Tag> tags = new HashSet<>();
        for (Integer tagId : postDto.getTags()) {
            Tag tag = new Tag();
            tag.setId(tagId);
            tags.add(tag);
        }
        post.setTags(tags);
        return postMapper.mapping(postRepository.save(post));

    }
}
