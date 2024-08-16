package com.cs.home.nodeServer;

import com.cs.home.npmProject.NpmProject;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@Valid
public class NodeServer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @NotNull
    @Column(unique = true)
    private Integer port;

    @NotEmpty
    private String command;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private NpmProject npmProject;
}
