package com.cs.home.project;

import com.cs.home.appProcess.AppProcess;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Valid
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Size(max = 50)
    @Column(unique = true, nullable = false)
    private String path;


    @Size(max = 50)
    private String description;

    @OneToMany(mappedBy = "Project", cascade = CascadeType.ALL, orphanRemoval =
            true)
    private Set<AppProcess> appProcesses;

    public void add(AppProcess appProcess) {
        if (appProcesses == null) {
            setAppProcesses(new HashSet<>());
        }
        appProcesses.add(appProcess);
        appProcess.setProject(this);
    }

    public void remove(AppProcess appProcess) {
        appProcess.setProject(null);

        if (appProcesses == null) {
            return;
        }
        appProcesses.remove(appProcess);
    }

}
