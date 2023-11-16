package com.cs.home.post;

import com.cs.home.tag.QTag;
import com.cs.home.tag.Tag;
import com.cs.home.tag.TagRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


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
        fillPost(postPayload, post);
        return postMapper.mapping(postRepository.save(post));
    }

    @Override
    public PostResponse get(Integer id) {
        Optional<Post> postMaybe = postRepository.findById(id);
        return postMaybe.map(postMapper::mapping).orElse(null);
    }

    @Override
    public List<PostResponse> getAll() {
        return null;
    }

    @Override
    public PostResponse update(Integer id, PostPayload postPayload) {
        Post existingPost = postRepository.getReferenceById(id);
        fillPost(postPayload, existingPost);
        return postMapper.mapping(postRepository.save(existingPost));
    }

    @Override
    public void delete(Integer id) {
        postRepository.deleteById(id);
    }


    private void fillPost(PostPayload postPayload, Post post) {
        Set<Tag> tags = new HashSet<>();

        if (postPayload.getTags() != null) {
            BooleanExpression byIds =
                    QTag.tag.id.in(postPayload.getTags().stream().toList());

            Iterator<Tag> it = tagRepository.findAll(byIds).iterator();
            it.forEachRemaining(tags::add);
        }

        post.setTags(tags);
        postMapper.updatePost(postPayload, post);
    }

}
