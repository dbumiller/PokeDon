DROP DATABASE IF EXISTS pokedon;

CREATE DATABASE pokedon;

USE pokedon;

CREATE TABLE teams (
  teamId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  defense JSON
) AUTO_INCREMENT=1;

CREATE TABLE pokemons (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  typing JSON NOT NULL,
  defensiveResist JSON NOT NULL,
  defensiveWeak JSON NOT NULL,
  offensiveSynergy JSON NOT NULL,
  offensiveCompliment JSON NOT NULL,
  momentumFollowup JSON NOT NULL,
  momentousLeadIn JSON NOT NULL,
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
  defensiveUtility BOOLEAN NOT NULL,
  teamId INT,
  CONSTRAINT team
  FOREIGN KEY (teamId)
    REFERENCES teams(teamId)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) AUTO_INCREMENT=1;