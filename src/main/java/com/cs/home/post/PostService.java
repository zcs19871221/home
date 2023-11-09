package com.cs.home.post;


import java.util.List;

public interface PostService {

    PostResponse save(PostPayload postPayload);

    PostResponse get(Integer id);

    List<PostResponse> getAll();

    PostResponse update(Integer id, PostPayload postPayload);

    void Delete(Integer id);
}
