--liquibase formatted sql
--changeset Chengsi:create date_time table
create table date_time
(
    id               int auto_increment primary key,
    date_time    TIMESTAMP not null
);

