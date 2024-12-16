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

-- Insert data into users table
INSERT INTO users (username) VALUES 
    ('musiclover123'),
    ('rhythmranger'),
    ('melodymaven'),
    ('tuneTrekker');

-- Insert data into users_info table
INSERT INTO users_info (user_id, f_name, l_name) VALUES 
    (1, 'Alex', 'Johnson'),
    (2, 'Emma', 'Rodriguez'),
    (3, 'Michael', 'Chen'),
    (4, 'Sophia', 'Williams');

-- Insert data into vibe_rooms table
INSERT INTO vibe_rooms (user_id) VALUES 
    (1),
    (2),
    (3),
    (4);

-- Insert data into room_info table
INSERT INTO room_info (vibe_room_id, title, color_gradient, font) VALUES 
    (1, 'Chill Lounge', 'linear-gradient(315deg, #2980b9 0%, #6dd5fa 74%)', 'Roboto, sans-serif'),
    (2, 'Rock Nation', 'linear-gradient(315deg, #ff4e50 0%, #fc466b 74%)', 'Impact, sans-serif'),
    (3, 'Jazz Reflections', 'linear-gradient(315deg, #4ecdc4 0%, #45b7d1 74%)', 'Georgia, serif'),
    (4, 'Electronic Dreams', 'linear-gradient(315deg, #667eea 0%, #764ba2 74%)', 'Courier New, monospace');

-- Insert data into song_links table
INSERT INTO song_links (vibe_room_id, song_link) VALUES 
    (1, 'https://open.spotify.com/track/2JvzF1RMd4rkAfcSvcKV0P'), -- Smooth by Santana ft. Rob Thomas
    (1, 'https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5'), -- Another Day in Paradise by Phil Collins
    (2, 'https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg'), -- Yellow by Coldplay
    (2, 'https://open.spotify.com/track/0qPNDBW1i6SkEUTtRMuKm6'), -- Sweet Child O' Mine by Guns N' Roses
    (3, 'https://open.spotify.com/track/1yeB8MUNeLo9Ek1UEpsyz6'), -- Take Five by Dave Brubeck
    (3, 'https://open.spotify.com/track/2SumPdfTVBS3ppa0kM4Och'), -- What a Wonderful World by Louis Armstrong
    (4, 'https://open.spotify.com/track/6RUKPb4LETWmmr3iAEQktW'), -- Strobe by Deadmau5
    (4, 'https://open.spotify.com/track/2HO4CPn6POzujnq7WzPKZh'); -- Faded by Alan Walker

-- Insert data into media table
INSERT INTO media (vibe_room_id, img_link, txt) VALUES 
    (1, 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3', 'Chill vibes only'),
    (1, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', 'Relaxation station'),
    (2, 'https://images.unsplash.com/photo-1501612780327-45644538def0', 'Rock and roll forever'),
    (2, 'https://images.unsplash.com/photo-1501771924023-de00948f3479', 'Music is my passion'),
    (3, 'https://images.unsplash.com/photo-1519684013398-2e8d27ca879e', 'Smooth jazz nights'),
    (3, 'https://images.unsplash.com/photo-1543443374-ee60546f1695', 'Musical storytelling'),
    (4, 'https://images.unsplash.com/photo-1464375117522-1275a78c5699', 'Electronic waves'),
    (4, 'https://images.unsplash.com/photo-1519638399535-1b036603ac77', 'Beats and dreams');