package com.cs.home.post;

import com.cs.home.tag.Tag;
import com.cs.home.tag.TagDto;
import com.cs.home.tag.TagMapper;
import com.cs.home.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.HashSet;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final PostMapper postMapper;
    private final TagMapper tagMapper;

    private final EntityManager em;

    @Override
    @Transactional
    public PostDto save(PostDto postDto) {

        Post post = postMapper.mapping(postDto);

        Set<Tag> tags = new HashSet<>();

        for (TagDto tagDto : postDto.getTags()) {
            Tag tag = tagMapper.mapping(tagDto);
            em.merge(tag);
            tags.add(tag);
        }
        post.setTags(tags);
        return postMapper.mapping(postRepository.save(post));

    }
}
