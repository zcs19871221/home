package com.cs.home.tag;

import com.cs.home.post.Post;
import com.cs.home.post.PostRepository;
import com.cs.home.post.QPost;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final PostRepository postRepository;


    private final TagMapper tagMapper;

    @Override
    public TagResponse create(TagPayload tagPayload) {
        Tag tag = tagMapper.mapping(tagPayload);
        return tagMapper.mapping(tagRepository.save(tag));
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        Tag tagToDelete = tagRepository.getReferenceById(id);
        BooleanExpression byTag = QPost.post.tags.contains(tagToDelete);
        Iterable<Post> posts = postRepository.findAll(byTag);
        for (Post p : posts) {
            p.getTags().remove(tagToDelete);
        }
        postRepository.saveAll(posts);
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

    @Override
    public TagResponse find(Integer id) {
        Optional<Tag> tagMaybe =
                tagRepository.findById(id);
        return tagMaybe.map(tagMapper::mapping).orElse(null);
    }
}
