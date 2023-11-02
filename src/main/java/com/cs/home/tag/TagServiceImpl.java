package com.cs.home.tag;

import com.querydsl.core.types.dsl.BooleanExpression;
import javax.persistence.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    private final TagMapper tagMapper;
    @Override
    public TagDto saveOrUpdate(TagDto tagPayload) {
        Tag tag = tagMapper.mapping(tagPayload);
        return tagMapper.mapping(tagRepository.save(tag));
    }

    public List<TagDto> saveOrUpdateAll(List<TagDto> tagPayloads) {
        List<Tag> tags = tagMapper.mapping(tagPayloads);
        return tagMapper.daoToDto(tagRepository.saveAll(tags));
    }
}
