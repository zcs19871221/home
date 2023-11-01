package com.cs.home.tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface TagRepository extends JpaRepository<Tag, Integer>,
        QuerydslPredicateExecutor<Tag> {


}
