package com.cs.home.NodeServers;

import com.cs.home.NpmProjects.NpmProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface NodeServerRepository extends JpaRepository<NodeServer, Integer>,
        QuerydslPredicateExecutor<NpmProject> {

}
