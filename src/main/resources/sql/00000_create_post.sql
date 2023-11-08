--liquibase formatted sql
--changeset chengsi:create post table
create table post
(
    id int auto_increment primary key,
    version bigint,
    name varchar(50) charset utf8mb4 not null,
    content varchar(768) charset utf8mb4 not null,
    last_modified_time datetime(6),

    constraint post_name_unique unique (name),
    constraint post_content_unique unique (content)
);

create index post_content_index
    on post (content);