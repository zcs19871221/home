package com.cs.home.post;

import com.cs.home.common.Auditable;
import com.cs.home.tag.Tag;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Getter
@Setter
@Valid
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @Version
    private Long version;

    @Column(unique = true, nullable = false)
    @Size(max = 768)
    private String content;

    @Size(max = 50)
    @Column(unique = true, nullable = false)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "post_tag",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @Valid
    private Set<Tag> tags;
}
