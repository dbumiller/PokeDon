DROP DATABASE IF EXISTS pokedon;

CREATE DATABASE pokedon;

USE pokedon;

CREATE TABLE teams (
  teamId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  defense VARCHAR(1000)
) AUTO_INCREMENT=1;

CREATE TABLE pokemons (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  typing VARCHAR(100) NOT NULL,
  defensiveResist VARCHAR(2000) NOT NULL,
  defensiveWeak VARCHAR(2000) NOT NULL,
  offensiveSynergy VARCHAR(2000) NOT NULL,
  offensiveCompliment VARCHAR(2000) NOT NULL,
  momentumFollowup VARCHAR(2000) NOT NULL,
  wallbreaker BOOLEAN NOT NULL,
  sweeper BOOLEAN NOT NULL,
  hazardControl BOOLEAN NOT NULL,
  rocker BOOLEAN NOT NULL,
  spiker BOOLEAN NOT NULL,
  tSpiker BOOLEAN NOT NULL,
  webber BOOLEAN NOT NULL,
  screener BOOLEAN NOT NULL,
  priority BOOLEAN NOT NULL,
  momentum BOOLEAN NOT NULL,
  speedControl BOOLEAN NOT NULL,
  teamId INT,
  CONSTRAINT team
  FOREIGN KEY (teamId)
    REFERENCES teams(teamId)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) AUTO_INCREMENT=1;

