package com.cs.home.tag;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    private final TagMapper tagMapper;

    @Override
    public TagResponse create(TagPayload tagPayload) {
        Tag tag = tagMapper.mapping(tagPayload);
        return tagMapper.mapping(tagRepository.save(tag));
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        tagRepository.deleteById(id);
    }

    @Override
    public List<TagResponse> findAll() {
        List<Tag> tags = tagRepository.findAll();
        return tagMapper.mapping(tags);
    }

    @Override
    @Transactional
    public TagResponse update(int id, TagPayload tagPayload) {
        Tag tag = tagRepository.getReferenceById(id);
        tagMapper.updateTag(tagPayload, tag);
        return tagMapper.mapping(tagRepository.save(tag));
    }
}
