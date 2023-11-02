package com.cs.home.tag;


import java.util.List;

public interface TagService {


    TagDto saveOrUpdate(TagDto tagPayload);

    List<TagDto> saveOrUpdateAll(List<TagDto> tagPayload);
}
