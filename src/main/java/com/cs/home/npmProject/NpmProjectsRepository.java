package com.cs.home.npmProject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface NpmProjectsRepository extends JpaRepository<NpmProject, Integer>,
        QuerydslPredicateExecutor<NpmProject> {

}
