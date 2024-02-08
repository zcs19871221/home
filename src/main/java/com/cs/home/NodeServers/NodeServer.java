package com.cs.home.NodeServers;

import com.cs.home.NpmProjects.NpmProject;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Getter
@Setter
@Valid
public class NodeServer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @NotEmpty
    private String command;

    @NotNull
    private String portConfigFileRelativePath;

    @NotNull
    private String portReg;

    @ManyToOne
    private NpmProject npmProject;

    @ManyToOne
    private NodeServer parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<NodeServer> children;

}
