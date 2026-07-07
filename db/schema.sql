/*  DROP DATABASE IF EXISTS pokedon;

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
  speed INT NOT NULL,
  attackingStat VARCHAR(100) NOT NULL,
  locked BOOLEAN,
  teamId INT,
  CONSTRAINT team
  FOREIGN KEY (teamId)
    REFERENCES teams(teamId)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) AUTO_INCREMENT=1;
*/

/*
DROP TABLE IF EXISTS pokemons CASCADE; -- Clear old tables safely
DROP TABLE IF EXISTS teams CASCADE;

-- Note: Postgres does not use the "USE pokedon;" command.
-- You connect directly to the database when running this file.

CREATE TABLE teams (
  "teamId" SERIAL PRIMARY KEY,     -- 👈 Changed to SERIAL (Auto-increments)
  name VARCHAR(100) NOT NULL,
  defense JSONB                  -- 👈 Changed to JSONB (Faster, optimized JSON)
);

CREATE TABLE pokemons (
  id SERIAL PRIMARY KEY,         -- 👈 Changed to SERIAL
  name VARCHAR(100) NOT NULL,
  "typing" JSONB NOT NULL,          -- 👈 Changed to JSONB
  "defensiveResist" JSONB NOT NULL,
  "defensiveWeak" JSONB NOT NULL,
  "offensiveSynergy" JSONB NOT NULL,
  "offensiveCompliment" JSONB NOT NULL,
  "momentumFollowup" JSONB NOT NULL,
  "momentousLeadIn" JSONB NOT NULL,
  "wallbreaker" BOOLEAN NOT NULL,
  "sweeper" BOOLEAN NOT NULL,
  "hazardControl" BOOLEAN NOT NULL,
  "rocker" BOOLEAN NOT NULL,
  "spiker" BOOLEAN NOT NULL,
  "tSpiker" BOOLEAN NOT NULL,
  "webber" BOOLEAN NOT NULL,
  "screener" BOOLEAN NOT NULL,
  "priority" BOOLEAN NOT NULL,
  "momentum" BOOLEAN NOT NULL,
  "speedControl" BOOLEAN NOT NULL,
  "defensiveUtility" BOOLEAN NOT NULL,
  "speed" INT NOT NULL,
  "attackingStat" VARCHAR(100) NOT NULL,
  "locked" BOOLEAN,
  "teamId" INT,
  CONSTRAINT team
  FOREIGN KEY (teamId)
    REFERENCES teams(teamId)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);
*/

DROP TABLE IF EXISTS pokemons CASCADE;
DROP TABLE IF EXISTS teams CASCADE;

CREATE TABLE teams (
  "teamId" SERIAL PRIMARY KEY,    -- Keep quotes here because Sequelize generates "teamId" by default for primary keys
  name VARCHAR(100) NOT NULL,
  defense JSONB NOT NULL
);

CREATE TABLE pokemons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  typing JSONB NOT NULL,
  defensive_resist JSONB NOT NULL,
  defensive_weak JSONB NOT NULL,
  offensive_synergy JSONB NOT NULL,
  offensive_compliment JSONB NOT NULL,
  momentum_followup JSONB NOT NULL,
  momentous_lead_in JSONB NOT NULL,
  wallbreaker BOOLEAN NOT NULL,
  sweeper BOOLEAN NOT NULL,
  hazard_control BOOLEAN NOT NULL,
  rocker BOOLEAN NOT NULL,
  spiker BOOLEAN NOT NULL,
  t_spiker BOOLEAN NOT NULL,
  webber BOOLEAN NOT NULL,
  screener BOOLEAN NOT NULL,
  priority BOOLEAN NOT NULL,
  momentum BOOLEAN NOT NULL,
  speed_control BOOLEAN NOT NULL,
  defensive_utility BOOLEAN NOT NULL,
  speed INT NOT NULL,
  attacking_stat VARCHAR(100) NOT NULL,
  locked BOOLEAN,
  "teamId" INT,
  CONSTRAINT team
  FOREIGN KEY ("teamId")
    REFERENCES teams("teamId")
    ON UPDATE CASCADE
    ON DELETE SET NULL
);
