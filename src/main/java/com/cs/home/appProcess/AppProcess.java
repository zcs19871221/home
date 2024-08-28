package com.cs.home.appProcess;

import com.cs.home.project.Project;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

@Entity
@Getter
@Setter
@Valid
public class AppProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(unique = true)
    private Integer port;

    @NotEmpty
    private String command;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;
}
