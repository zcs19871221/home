package com.cs.home.tag;


import java.util.List;

public interface TagService {


    TagDto create(TagDto tagPayload);

    void delete(Integer id);

    List<TagDto> findAll();

    TagDto update(TagDto tagPayload);
}
