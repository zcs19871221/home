package com.cs.home.NodeServers;

import com.cs.home.NpmProjects.NpmProject;
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
public class NodeServer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @NotEmpty
    private String command;

    @NotEmpty
    @Column(unique = true)
    private String name;

    @NotEmpty
    private String portConfigFileRelativePath;

    @NotEmpty
    private String portReg;

    @ManyToOne
    private NpmProject npmProject;

    @ManyToOne
    private NodeServer prevServer;

    @OneToMany(mappedBy = "prevServer", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<NodeServer> postServers;

    public void addPostServer(NodeServer postServer) {
        if (postServers == null) {
            setPostServers(new HashSet<>());
        }
        postServer.prevServer = this;
        postServers.add(postServer);
    }

    public void removePostServer(NodeServer postServer
    ) {
        if (postServers == null) {
            setPostServers(new HashSet<>());
        }
        postServers.remove(postServer);
        if (postServer != null) {
            postServer.prevServer = null;
        }
    }

}
