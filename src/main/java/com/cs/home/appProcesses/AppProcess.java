package com.cs.home.appProcesses;

import com.cs.home.appProcessStatus.AppProcessStatus;
import com.cs.home.projects.Project;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Valid
public class AppProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private Integer port;

    @NotEmpty
    private String command;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;

    @OneToMany(mappedBy = "appProcess", cascade = CascadeType.ALL,
            orphanRemoval =
                    true)
    private Set<AppProcessStatus> appProcessStatuses;

    public void add(AppProcessStatus appProcessStatus) {
        if (appProcessStatuses == null) {
            setAppProcessStatuses(new HashSet<>());
        }
        appProcessStatuses.add(appProcessStatus);
        appProcessStatus.setAppProcess(this);
    }

    public void remove(AppProcessStatus appProcessStatus) {

        if (appProcessStatus == null) {
            return;
        }
        appProcessStatus.setAppProcess(null);

        appProcessStatuses.remove(appProcessStatus);
    }


}
