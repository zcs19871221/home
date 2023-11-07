--liquibase formatted sql
--changeset chengsi:create post table
create table post
(
    id                 int auto_increment
        primary key,
    content            varchar(1000) charset utf8mb3 not null,
    last_modified_time datetime(6)                   null,
    constraint post_pk
        unique (content)
);

create index post_content_index
    on post (content);