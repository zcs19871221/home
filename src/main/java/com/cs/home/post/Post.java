package com.cs.home.post;

import com.cs.home.tag.Tag;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue
    @Column(unique = true, nullable = false)
    private int id;

    @Column(nullable = false)
    private String content;

    private Date lastModifiedTime;

    @ManyToMany
    @JoinTable(
            name = "post_tag",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags;
}
