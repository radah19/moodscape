DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id serial,
    username varchar(255) DEFAULT 'Anuj'
)