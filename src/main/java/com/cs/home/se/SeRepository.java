package com.cs.home.se;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface SeRepository extends JpaRepository<Se, Integer>,
        QuerydslPredicateExecutor<Se> {

}
