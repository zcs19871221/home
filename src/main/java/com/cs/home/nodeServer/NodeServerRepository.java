package com.cs.home.nodeServer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface NodeServerRepository extends JpaRepository<NodeServer, Integer>,
        QuerydslPredicateExecutor<NodeServer> {

}
