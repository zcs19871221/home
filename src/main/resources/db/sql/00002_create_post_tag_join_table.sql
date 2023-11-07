--liquibase formatted sql
--changeset chengsi:create post tag join table
create table post_tag
(
    post_id int not null,
    tag_id  int not null,
    primary key (post_id, tag_id),
    constraint FKac1wdchd2pnur3fl225obmlg0
        foreign key (tag_id) references tag (id),
    constraint FKc2auetuvsec0k566l0eyvr9cs
        foreign key (post_id) references post (id)
);

