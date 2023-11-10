package com.cs.home.tag;

import com.cs.home.common.Auditable;
import com.cs.home.post.Post;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Getter
@Setter
public class Tag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Integer id;

    @Version
    private Long version;

    @Column(unique = true, nullable = false)
    @Size(max = 50)
    private String name;

    @ManyToMany(mappedBy = "tags")
    @Valid
    private Set<Post> posts;
}
