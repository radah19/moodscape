DROP TABLE IF EXISTS users_info;
DROP TABLE IF EXISTS room_info;
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
    color_gradient varchar(255) DEFAULT 'linear-gradient(315deg, #fde7f9 0%, #aacaef 74%)',
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
    ('tuneTrekker', 'Sophia', 'Williams'),
    ('Xinxinxin', 'Xinxi', 'Nxinyue'),
    ('Xinxin', 'Xinnian', 'Xinth');

-- Insert data into vibe_rooms table (2-3 rooms per user)
INSERT INTO vibe_rooms (created_by, title, color_gradient, font) VALUES 
    -- musiclover123's rooms
    ('musiclover123', 'Chill Lounge', 'linear-gradient(315deg, #2980b9 0%, #6dd5fa 74%)', 'Roboto, sans-serif'),
    ('musiclover123', 'Late Night Vibes', 'linear-gradient(315deg, #000428 0%, #004e92 74%)', 'Helvetica, sans-serif'),
    ('musiclover123', 'Morning Coffee', 'linear-gradient(315deg, #f9d423 0%, #e14fad 74%)', 'Arial, sans-serif'),
    
    -- rhythmranger's rooms
    ('rhythmranger', 'Rock Nation', 'linear-gradient(315deg, #ff4e50 0%, #fc466b 74%)', 'Impact, sans-serif'),
    ('rhythmranger', 'Punk Paradise', 'linear-gradient(315deg, #6b0f1a 0%, #b91372 74%)', 'Arial Black, sans-serif'),
    
    -- melodymaven's rooms
    ('melodymaven', 'Jazz Reflections', 'linear-gradient(315deg, #4ecdc4 0%, #45b7d1 74%)', 'Georgia, serif'),
    ('melodymaven', 'Classical Corner', 'linear-gradient(315deg, #7f53ac 0%, #647dee 74%)', 'Times New Roman, serif'),
    ('melodymaven', 'Blues Basement', 'linear-gradient(315deg, #89d4cf 0%, #6e45e1 74%)', 'Palatino, serif'),
    
    -- tuneTrekker's rooms
    ('tuneTrekker', 'Electronic Dreams', 'linear-gradient(315deg, #667eea 0%, #764ba2 74%)', 'Courier New, monospace'),
    ('tuneTrekker', 'Synthwave Station', 'linear-gradient(315deg, #20bf55 0%, #01baef 74%)', 'Trebuchet MS, sans-serif'),
    
    -- Xinxinxin's rooms
    ('Xinxinxin', 'C-Pop Central', 'linear-gradient(315deg, #d4418e 0%, #0652c5 74%)', 'Century Gothic, sans-serif'),
    ('Xinxinxin', 'Mandopop Mix', 'linear-gradient(315deg, #fc9842 0%, #fe5f75 74%)', 'Microsoft YaHei, sans-serif'),
    
    -- Xinxin's rooms
    ('Xinxin', 'Asian Underground', 'linear-gradient(315deg, #f7b42c 0%, #fc575e 74%)', 'Noto Sans SC, sans-serif'),
    ('Xinxin', 'Traditional Fusion', 'linear-gradient(315deg, #89d4cf 0%, #6e45e1 74%)', 'SimSun, serif');

-- Insert data into song_links table (2-3 songs per room)
INSERT INTO song_links (vibe_room_id, song_link) VALUES 
    -- musiclover123's room songs
    (1, 'https://open.spotify.com/track/2JvzF1RMd4rkAfcSvcKV0P'),
    (1, 'https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5'),
    (2, 'https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS'),
    (2, 'https://open.spotify.com/track/1301WleyT98MSxVHPZCA6M'),
    (3, 'https://open.spotify.com/track/3w3y8KPTfNeOKPiqUTakBh'),
    (3, 'https://open.spotify.com/track/5BIMPccDwShpXq784RJlJp'),
    
    -- rhythmranger's room songs
    (4, 'https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg'),
    (4, 'https://open.spotify.com/track/0qPNDBW1i6SkEUTtRMuKm6'),
    (5, 'https://open.spotify.com/track/4Li2WHPkuyCdtmokzW2007'),
    (5, 'https://open.spotify.com/track/1301WleyT98MSxVHPZCA6M'),
    
    -- melodymaven's room songs
    (6, 'https://open.spotify.com/track/1yeB8MUNeLo9Ek1UEpsyz6'),
    (6, 'https://open.spotify.com/track/2SumPdfTVBS3ppa0kM4Och'),
    (7, 'https://open.spotify.com/track/2gZUPNdnz5Y45eiGxpHGSc'),
    (7, 'https://open.spotify.com/track/3HNnxK7NgLXbDoxRZxNWiR'),
    (8, 'https://open.spotify.com/track/0ofHAoxe9vBkTCp2UQIavz'),
    (8, 'https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB'),
    
    -- tuneTrekker's room songs
    (9, 'https://open.spotify.com/track/6RUKPb4LETWmmr3iAEQktW'),
    (9, 'https://open.spotify.com/track/2HO4CPn6POzujnq7WzPKZh'),
    (10, 'https://open.spotify.com/track/4Oun2ylbjFKMPTiaSbbCih'),
    (10, 'https://open.spotify.com/track/5RADr7HnZVBB5ykP6VwVZ4'),
    
    -- Xinxinxin's room songs
    (11, 'https://open.spotify.com/track/1301WleyT98MSxVHPZCA6M'),
    (11, 'https://open.spotify.com/track/5BIMPccDwShpXq784RJlJp'),
    (12, 'https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS'),
    (12, 'https://open.spotify.com/track/3w3y8KPTfNeOKPiqUTakBh'),
    
    -- Xinxin's room songs
    (13, 'https://open.spotify.com/track/2gZUPNdnz5Y45eiGxpHGSc'),
    (13, 'https://open.spotify.com/track/3HNnxK7NgLXbDoxRZxNWiR'),
    (14, 'https://open.spotify.com/track/0ofHAoxe9vBkTCp2UQIavz'),
    (14, 'https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB');

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
    (10, 'https://images.unsplash.com/photo-1515104112426-7b337e3f4fb9', 'Retro future'),
    
    -- Xinxinxin's room media
    (11, 'https://images.unsplash.com/photo-1516280440614-37939bbacd81', 'C-Pop vibes'),
    (11, 'https://images.unsplash.com/photo-1523554888454-84137e72c3ce', 'Modern Chinese pop'),
    (12, 'https://images.unsplash.com/photo-1499415479124-43c32433a620', 'Mandarin hits'),
    (12, 'https://images.unsplash.com/photo-1499424017184-c82f39a192f1', 'Pop culture'),
    
    -- Xinxin's room media
    (13, 'https://images.unsplash.com/photo-1516280440614-37939bbacd81', 'Underground beats'),
    (13, 'https://images.unsplash.com/photo-1523554888454-84137e72c3ce', 'Asian fusion'),
    (14, 'https://images.unsplash.com/photo-1499415479124-43c32433a620', 'Traditional meets modern'),
    (14, 'https://images.unsplash.com/photo-1499424017184-c82f39a192f1', 'East meets west');