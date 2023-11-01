package com.cs.home.post;

import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    public String name;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public PostResponseDto get() {
        Long id = 1234L;
        Post order = postRepository.getReferenceById(id);
        return new PostResponseDto("hello");
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }
}
