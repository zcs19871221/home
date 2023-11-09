package com.cs.home.post;

import com.cs.home.tag.Tag;
import com.cs.home.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final PostMapper postMapper;


    @Override
    @Transactional
    public PostResponse save(PostPayload postPayload) {

        Post post = postMapper.mapping(postPayload);

        Set<Tag> tags = new HashSet<>();

        for (int tagId : postPayload.getTags()) {
            Tag tag = tagRepository.getReferenceById(tagId);
            tags.add(tag);
        }
        post.setTags(tags);
        return postMapper.mapping(postRepository.save(post));
    }

    @Override
    public PostResponse get(Integer id) {
        return null;
    }

    @Override
    public List<PostResponse> getAll() {
        return null;
    }

    @Override
    public PostResponse update(Integer id, PostPayload postPayload) {
        return null;
    }

    @Override
    public void Delete(Integer id) {

    }
}
