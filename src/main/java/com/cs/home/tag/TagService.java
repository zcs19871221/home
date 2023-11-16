package com.cs.home.tag;


import java.util.List;

public interface TagService {


    TagResponse create(TagPayload tagPayload);

    void delete(Integer id);

    List<TagResponse> findAll();

    TagResponse update(int id, TagPayload tagPayload);

    TagResponse find(Integer id);
}
