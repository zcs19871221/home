package com.cs.home.appProcessStatus;

import com.cs.home.appProcesses.AppProcess;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

@Entity
@Getter
@Setter
@Valid
public class AppProcessStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @NotEmpty
    private String matcher;

    @NotEmpty
    private String name;

    @NotEmpty
    private String color;

    @ManyToOne(fetch = FetchType.LAZY)
    private AppProcess appProcess;

}
