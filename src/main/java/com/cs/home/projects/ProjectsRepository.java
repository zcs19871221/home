package com.cs.home.projects;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface ProjectsRepository extends JpaRepository<Project, Integer>,
        QuerydslPredicateExecutor<Project> {

}
