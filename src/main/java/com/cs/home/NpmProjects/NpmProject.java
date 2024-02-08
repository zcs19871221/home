package com.cs.home.NpmProjects;

import com.cs.home.NodeServers.NodeServer;
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
public class NpmProject {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Size(max = 50)
    @Column(unique = true, nullable = false)
    private String path;

    @OneToMany(mappedBy = "npmProject")
    private Set<NodeServer> nodeServers;

}
