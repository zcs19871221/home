package com.cs.home.post;

import com.cs.home.tag.QTag;
import com.cs.home.tag.Tag;
import com.cs.home.tag.TagRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;


@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final PostMapper postMapper;


    @Override
    @Transactional
    public PostResponse save(PostPayload postPayload) {

        Post post = postMapper.mapping(postPayload);
        BooleanExpression byIds =
                QTag.tag.id.in(postPayload.getTags().stream().toList());

        Iterator<Tag> it = tagRepository.findAll(byIds).iterator();
        Set<Tag> tags = new HashSet<>();
        it.forEachRemaining(tags::add);
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
