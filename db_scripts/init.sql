DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id serial primary key,
    username varchar(255) DEFAULT 'Anuj',
    unique(username)
);

DROP TABLE IF EXISTS vibes_rooms;
CREATE TABLE vibe_rooms (
    id serial primary key,
    user_id integer references users(id),

);

DROP TABLE IF EXISTS song_links;
CREATE TABLE song_links (
    id serial primary key,
    vibe_room_id integer references vibe_rooms(id),
    song_link varchar(255)
);

DROP TABLE IF EXISTS media;
CREATE TABLE media (
    id serial primary key,
    vibe_room_id integer references vibe_rooms(id),
    img_link varchar(255),
    txt text
);

DROP TABLE IF EXISTS room_info;
CREATE TABLE room_info (
    vibe_room_id integer references vibe_rooms(id) primary key,
    color_gradient varchar(255) DEFAULT 'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)',
    font varchar(255) DEFAULT 'Arial, sans-serif'
);

DROP TABLE IF EXISTS users_info;
CREATE TABLE users_info (
    user_id integer references users(id) primary key,
    f_name varchar(255),
    l_name varchar(255)
);