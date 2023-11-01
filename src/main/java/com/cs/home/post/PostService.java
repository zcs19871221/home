package com.cs.home.post;


public interface PostService {

    PostResponseDto get();

    String getName();

    void setName(String name);
}
