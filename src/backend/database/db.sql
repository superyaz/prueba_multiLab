--CREATE DATABASE
CREATE DATABASE database_frases;
USE database_frases;
--USERS TABLE
CREATE TABLE users (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2,
  username VARCHAR (16) NOT NULL,
  password VARCHAR (60) NOT NULL,
  fullname VARCHAR (100) NOT NULL
);
--LINKS TABLES
CREATE TABLE frases (
  id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2,
  title VARCHAR (150) NOT NULL,
  description TEXT,
  user_id INT (11),
  create_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
);