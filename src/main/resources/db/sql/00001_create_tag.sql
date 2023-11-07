--liquibase formatted sql
--changeset chengsi:create tag table
create table tag
(
    id   int auto_increment
        primary key,
    name varchar(50) charset utf8mb3 not null,
    constraint tag_name_unique
        unique (name)
);

