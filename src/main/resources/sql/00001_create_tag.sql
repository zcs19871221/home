--liquibase formatted sql
--changeset chengsi:create tag table
create table tag
(
    id   int auto_increment
        primary key,
    version bigint,
    name varchar(50) charset utf8mb4 not null,
    constraint tag_name_unique
        unique (name)
);

