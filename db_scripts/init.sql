-- DROP TABLE IF EXISTS users_info;
-- DROP TABLE IF EXISTS room_info;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS song_links;
DROP TABLE IF EXISTS vibe_rooms;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username varchar(255) PRIMARY KEY,
    f_name varchar(255),
    l_name varchar(255)
);

CREATE TABLE vibe_rooms (
    id serial PRIMARY KEY,
    created_by varchar(255) REFERENCES users(username),
    title varchar(255) DEFAULT 'Title',
    color_gradient varchar(255) DEFAULT 'linear-gradient(45deg, #fde7f9, #aacaef)',
    font varchar(255) DEFAULT 'Arial, sans-serif'
);

CREATE TABLE song_links (
    id serial PRIMARY KEY,
    vibe_room_id integer REFERENCES vibe_rooms(id),
    song_link varchar(255)
);

CREATE TABLE media (
    id serial PRIMARY KEY,
    vibe_room_id integer REFERENCES vibe_rooms(id),
    img_link varchar(255),
    txt text
);

-- Original users for reference
INSERT INTO users (username, f_name, l_name) VALUES 
    ('musiclover123', 'Alex', 'Johnson'),
    ('rhythmranger', 'Emma', 'Rodriguez'),
    ('melodymaven', 'Michael', 'Chen'),
    ('tuneTrekker', 'Sophia', 'Williams');

-- Insert data into vibe_rooms table (2-3 rooms per user)
INSERT INTO vibe_rooms (created_by, title, color_gradient, font) VALUES 
    -- musiclover123's rooms
    ('musiclover123', 'Chill Lounge', 'linear-gradient(45deg, #2980b9, #6dd5fa)', 'Roboto, sans-serif'),
    ('musiclover123', 'Late Night Vibes', 'linear-gradient(45deg, #000428, #004e92)', 'Helvetica, sans-serif'),
    ('musiclover123', 'Morning Coffee', 'linear-gradient(45deg, #f9d423, #e14fad)', 'Arial, sans-serif'),
    
    -- rhythmranger's rooms
    ('rhythmranger', 'Rock Nation', 'linear-gradient(45deg, #ff4e50, #fc466b)', 'Impact, sans-serif'),
    ('rhythmranger', 'Punk Paradise', 'linear-gradient(45deg, #6b0f1a, #b91372)', 'Arial Black, sans-serif'),
    
    -- melodymaven's rooms
    ('melodymaven', 'Jazz Reflections', 'linear-gradient(45deg, #4ecdc4, #45b7d1)', 'Georgia, serif'),
    ('melodymaven', 'Classical Corner', 'linear-gradient(45deg, #7f53ac, #647dee)', 'Times New Roman, serif'),
    ('melodymaven', 'Blues Basement', 'linear-gradient(45deg, #89d4cf, #6e45e1)', 'Palatino, serif'),
    
    -- tuneTrekker's rooms
    ('tuneTrekker', 'Electronic Dreams', 'linear-gradient(45deg, #667eea, #764ba2)', 'Courier New, monospace'),
    ('tuneTrekker', 'Synthwave Station', 'linear-gradient(45deg, #20bf55, #01baef)', 'Trebuchet MS, sans-serif');

-- Insert data into song_links table (2-3 songs per room)
INSERT INTO song_links (vibe_room_id, song_link) VALUES 
    -- musiclover123's room songs
    (1, 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT'), -- 'Never Gonna Give You Up' by Rick Astley
    (1, 'https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv'), -- 'Bohemian Rhapsody' by Queen
    (2, 'https://open.spotify.com/track/1YrC8s6yaMN8XqoCT0RiFy'), -- 'Shake It Off' by Taylor Swift
    (2, 'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3'), -- 'Shape of You' by Ed Sheeran
    (3, 'https://open.spotify.com/track/4Dvkj6JhhA12EX05fT7y2e'), -- 'As It Was' by Harry Styles
    (3, 'https://open.spotify.com/track/1mWdTewIgB3gtBM3TOSFhB'), -- 'Cruel Summer' by Taylor Swift
    
    -- rhythmranger's room songs
    (4, 'https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG'), -- 'Starboy' by The Weeknd
    (4, 'https://open.spotify.com/track/0e3johd9GSzLTF8F2vszxz'), -- 'Blinding Lights' by The Weeknd
    (5, 'https://open.spotify.com/track/3k3NWokhRRkEPhCzPmV8TW'), -- 'Flowers' by Miley Cyrus
    (5, 'https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu'), -- 'Anti-Hero' by Taylor Swift
    
    -- melodymaven's room songs
    (6, 'https://open.spotify.com/track/2LBqCSwhJGcFQeTHMVGwy3'), -- 'Die For You' by The Weeknd
    (6, 'https://open.spotify.com/track/2gQPv5jvVPqU2a9HhMNO1v'), -- 'Unholy' by Sam Smith, Kim Petras
    (7, 'https://open.spotify.com/track/0rzaRSujxA0bKyjJl6vHYq'), -- 'STAY' by The Kid LAROI, Justin Bieber
    (7, 'https://open.spotify.com/track/7qEHsqek33rTcFNT9PFqLf'), -- 'Someone You Loved' by Lewis Capaldi
    (8, 'https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG'), -- 'good 4 u' by Olivia Rodrigo
    (8, 'https://open.spotify.com/track/4fouWK6XVHhzl78KzQ1UjL'), -- 'abcdefu' by GAYLE
    
    -- tuneTrekker's room songs
    (9, 'https://open.spotify.com/track/3P3UA61WRQqwCXaoFOTENd'), -- 'Sunroof' by Nicky Youre, dazy
    (9, 'https://open.spotify.com/track/0QHEIqNKsMoOY5urbzN48u'), -- 'Made You Look' by Meghan Trainor
    (10, 'https://open.spotify.com/track/1bDbXMyjaUIooNwFE9wn0N'), -- 'About Damn Time' by Lizzo
    (10, 'https://open.spotify.com/track/0O6u0VJ46W86TxN9wgyqDj'); -- 'Snap' by Rosa Linn

-- Insert data into media table (2 media items per room)
INSERT INTO media (vibe_room_id, img_link, txt) VALUES 
    -- musiclover123's room media
    (1, 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3', 'Chill vibes only'),
    (1, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', 'Relaxation station'),
    (2, 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7', 'Night owl music'),
    (2, 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1', 'Midnight melodies'),
    (3, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', 'Morning playlist'),
    (3, 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13', 'Coffee and tunes'),
    
    -- rhythmranger's room media
    (4, 'https://images.unsplash.com/photo-1501612780327-45644538def0', 'Rock and roll forever'),
    (4, 'https://images.unsplash.com/photo-1501771924023-de00948f3479', 'Music is my passion'),
    (5, 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc', 'Punks not dead'),
    (5, 'https://images.unsplash.com/photo-1571151329817-b866b61e7d3c', 'Anarchy and music'),
    
    -- melodymaven's room media
    (6, 'https://images.unsplash.com/photo-1519684013398-2e8d27ca879e', 'Smooth jazz nights'),
    (6, 'https://images.unsplash.com/photo-1543443374-ee60546f1695', 'Musical storytelling'),
    (7, 'https://images.unsplash.com/photo-1507838153414-b4b713384a76', 'Classical collection'),
    (7, 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0', 'Symphony space'),
    (8, 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', 'Blues and soul'),
    (8, 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae', 'Rhythm and blues'),
    
    -- tuneTrekker's room media
    (9, 'https://images.unsplash.com/photo-1464375117522-1275a78c5699', 'Electronic waves'),
    (9, 'https://images.unsplash.com/photo-1519638399535-1b036603ac77', 'Beats and dreams'),
    (10, 'https://images.unsplash.com/photo-1518972559570-7cc1309f3229', 'Synthwave vibes'),
    (10, 'https://images.unsplash.com/photo-1515104112426-7b337e3f4fb9', 'Retro future');