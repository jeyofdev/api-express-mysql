CREATE DATABASE db_movies;
USE db_movies;

DROP TABLE IF EXISTS movie;
CREATE TABLE `movie`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `director` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `duration` int NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO movie (title, director, year, rating, duration, type) VALUES
  ('Star Wars : a new hope', 'George Lucas', '1977', 8.6, 121, 'Sci-Fi'),
  ('The Godfather', 'Francis Ford Coppola', '1972', 9.2, 175, 'Drama'),
  ('Jurassic Park', 'Steven Spielberg', '1993', 8.1, 127, 'Adventure'),
  ('The Matrix', 'Wachowski brothers', '1999', 8.7, 136, 'Sci-Fi'),
  ('Interstellar', 'Christopher Nolan', '2014', 8.6, 169, 'Sci-Fi'),
  ('The Dark Knight', 'Christopher Nolan', '2008', 9.0, 152, 'Action');

DROP TABLE IF EXISTS user;
CREATE TABLE `user`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user (email, firstname, lastname, city) VALUES
  ('john.doe@example.com', 'John', 'Doe', 'London'),
  ('jane.doe@example.com', 'Jane', 'Doe', 'New-york'),
  ('Bob.doe@example.com', 'Bob', 'Doe', 'Paris');