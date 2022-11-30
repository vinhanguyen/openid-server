DROP DATABASE IF EXISTS dev;
CREATE DATABASE dev;

DROP USER IF EXISTS 'dev'@'localhost';
CREATE USER 'dev'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dev';
GRANT ALL ON dev.* TO 'dev'@'localhost';

USE dev;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  email VARCHAR(255) NOT NULL PRIMARY KEY
);
