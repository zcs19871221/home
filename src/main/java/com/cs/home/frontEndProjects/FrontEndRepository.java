package com.cs.home.frontEndProjects;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface Repository extends JpaRepository<FrontProject, Integer>,
        QuerydslPredicateExecutor<FrontProject> {

}
