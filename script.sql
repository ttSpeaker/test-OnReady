DROP DATABASE OnReadyPelis;
CREATE DATABASE OnReadyPelis;

USE OnReadyPelis;

CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `duration` INT DEFAULT NULL,
  `director` varchar(400) DEFAULT NULL,
  `year` INT DEFAULT NULL,
  `release` DATE DEFAULT NULL,
  `score` INT DEFAULT NULL,
  `poster` varchar(300) DEFAULT NULL,
  `plot` varchar(700) DEFAULT NULL,
  `genre_id` INT DEFAULT NULL,
  `active` TINYINT(1) DEFAULT 1,
  PRIMARY KEY (`id`)
);