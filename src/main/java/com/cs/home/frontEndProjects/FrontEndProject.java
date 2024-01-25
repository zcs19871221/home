package com.cs.home.frontEndProjects;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@Valid
public class FrontEndProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 50)
    @Column(unique = true, nullable = false)
    private String name;

    @Size(max = 50)
    @Column(unique = true, nullable = false)
    private String path;

    @Column(nullable = false)
    private String command;


}
