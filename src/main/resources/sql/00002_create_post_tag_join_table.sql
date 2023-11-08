--liquibase formatted sql
--changeset chengsi:create post tag join table
create table post_tag
(
    post_id int not null,
    tag_id  int not null,
    primary key (post_id, tag_id),
    constraint FK_tag_id_tag_id
        foreign key (tag_id) references tag (id),
    constraint FK_post_id_post_id
        foreign key (post_id) references post (id)
);

