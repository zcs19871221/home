--liquibase formatted sql
--changeset Chengsi:create post table
create table post
(
    id int auto_increment primary key,
    version bigint,
    name varchar(50) charset utf8mb4 not null,
    content varchar(768) charset utf8mb4 not null,
    created_at timestamp not null,
    created_by varchar(25) charset utf8mb4,
    last_modified_at timestamp,
    last_modified_by varchar(25) charset utf8mb4,
    constraint post_name_unique unique (name),
    constraint post_content_unique unique (content)
);

create index post_content_index
    on post (content);