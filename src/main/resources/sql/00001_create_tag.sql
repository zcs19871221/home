--liquibase formatted sql
--changeset Chengsi:create tag table
create table tag
(
    id   int auto_increment
        primary key,
    version bigint,
    name varchar(50) charset utf8mb4 not null,
    created_at timestamp not null,
    created_by varchar(25) charset utf8mb4,
    last_modified_at timestamp,
    last_modified_by varchar(25) charset utf8mb4,
    constraint tag_name_unique
        unique (name)
);

