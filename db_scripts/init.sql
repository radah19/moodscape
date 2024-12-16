DROP TABLE IF EXISTS users_info;
DROP TABLE IF EXISTS room_info;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS song_links;
DROP TABLE IF EXISTS vibe_rooms;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial primary key,
    username varchar(255) DEFAULT 'Anuj',
    unique(username)
);

CREATE TABLE vibe_rooms (
    id serial primary key,
    user_id integer references users(id)
);

CREATE TABLE song_links (
    id serial primary key,
    vibe_room_id integer references vibe_rooms(id),
    song_link varchar(255)
);

CREATE TABLE media (
    id serial primary key,
    vibe_room_id integer references vibe_rooms(id),
    img_link varchar(255),
    txt text
);

CREATE TABLE room_info (
    vibe_room_id integer references vibe_rooms(id) primary key,
    title varchar(255) DEFAULT 'Title',
    color_gradient varchar(255) DEFAULT 'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)',
    font varchar(255) DEFAULT 'Arial, sans-serif'
);

CREATE TABLE users_info (
    user_id integer references users(id) primary key,
    f_name varchar(255),
    l_name varchar(255)
);