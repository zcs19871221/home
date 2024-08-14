package com.cs.home.npmProject;

import com.cs.home.nodeServer.NodeServer;
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
public class NpmProject {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Size(max = 50)
    @Column(unique = true, nullable = false)
    private String path;


    @Size(max = 50)
    private String description;

    @OneToMany(mappedBy = "npmProject", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<NodeServer> nodeServers;

    public void addNodeServer(NodeServer nodeServer) {
        if (nodeServers == null) {
            setNodeServers(new HashSet<>());
        }
        nodeServers.add(nodeServer);
        nodeServer.setNpmProject(this);
    }

    public void removeNodeServer(NodeServer nodeServer) {
        nodeServer.setNpmProject(null);

        if (nodeServers == null) {
            return;
        }
        nodeServers.remove(nodeServer);
    }

}
