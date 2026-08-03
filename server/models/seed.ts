/*  const db = require('./index.js');
const metagame = require('./typingAnalyzer');

const seed = () => {
  for (var i = 0; i < metagame.length; i++) {
    db.Pokemon.create(metagame[i]);
  }

  var typing = {
    'bug': 0,
    'dark': 0,
    'dragon': 0,
    'electric': 0,
    'fairy': 0,
    'fighting': 0,
    'fire': 0,
    'flying': 0,
    'ghost': 0,
    'grass': 0,
    'ground': 0,
    'ice': 0,
    'normal': 0,
    'poison': 0,
    'psychic': 0,
    'rock': 0,
    'steel': 0,
    'water': 0
  }

  var teams = ["New Bark Town Knights", "Vermillion City Veterans", "Viridian Forest Caterpie Carnage"];

  for (var i = 0; i < teams.length; i++) {
    var current = {
      name: teams[i],
      defense: typing
    };
    db.Team.create(current);
  }
}

seed(); */

/* const fs = require('fs');
const path = require('path');
const dns = require('dns');
const db = require('./index.js');
const metagame = require('./typingAnalyzer');

if (process.env.DB_HOST) {
  console.log(`Forcing Sequelize to connect to Docker host: ${process.env.DB_HOST}`);
  db.sequelize.config.host = process.env.DB_HOST;
  db.sequelize.options.host = process.env.DB_HOST;
  db.sequelize.connectionManager.config.host = process.env.DB_HOST;
}

const seed = async () => {
  try {
    console.log('Starting Postgres seeding...');

    // =========================================================
    // DIAGNOSTIC NETWORK OVERRIDE
    // =========================================================
    if (process.env.DB_HOST === 'postgres-db') {
      try {
        const ip = await new Promise((resolve, reject) => {
          dns.lookup('postgres-db', (err, address) => err ? reject(err) : resolve(address));
        });
        console.log(`🌐 Internal network resolved, postgres-db is running at ${ip}`);

        db.sequelize.options.host = ip;
        db.sequelize.config.host = ip;
        if (db.sequelize.connectionManager && db.sequelize.connectionManager.config) {
          db.sequelize.connectionManager.config.host = ip;
        }
      } catch (dnsErr) {
        console.error('❌ Docker DNS Error: Cannot resolve container name over the network.', dnsErr.message);
      }
    }

    // Uses native File System to get raw SQL text file
    console.log('Reading schema.sql...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema queries to build tables...');
    // Executes raw SQL file over network
    await db.sequelize.query(schemaSql);
    console.log('Schema tables created successfully!');


    // Seed Pokemon concurrently and wait for finish
    const pokemonPromises = metagame.map(pokemon => db.Pokemon.create(pokemon));
    await Promise.all(pokemonPromises);
    console.log(`Successfully seeded ${metagame.length} Pokemon.`);

    // Define typing structure
    // Note: If 'defense' is a JSON/JSONB column in Postgres, this works perfectly.
    const typing = {
      bug: 0, dark: 0, dragon: 0, electric: 0, fairy: 0, fighting: 0,
      fire: 0, flying: 0, ghost: 0, grass: 0, ground: 0, ice: 0,
      normal: 0, poison: 0, psychic: 0, rock: 0, steel: 0, water: 0
    };

    const teams = [
      "New Bark Town Knights",
      "Vermillion City Veterans",
      "Viridian Forest Caterpie Carnage"
    ];

    // 3. Seed Teams concurrently
    const teamPromises = teams.map(teamName => {
      return db.Team.create({
        name: teamName,
        defense: typing
      });
    });

    await Promise.all(teamPromises);
    console.log(`Successfully seeded ${teams.length} Teams.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // 4. Always close the database connection connection when done
    if (db.sequelize) {
      await db.sequelize.close();
      console.log('Database connection closed.');
    }
  }
};

seed(); */

// Native Node imports - import fs, path, dns, and fileURLToPath
import fs from 'node:fs';
import path from 'node:path';
import dns from 'node:dns';
import { fileURLToPath } from 'node:url';
// Internal module imports - import the sequelize instance, pokemon model, teams model, and draft array
import { sequelize, Pokemon, Team } from '../../db/index.js';
import * as metagame from '../../db/typingAnalyzer.js';

// Turns current file name and directory name into variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Turns path to schema into a variable
const sqlFilePath = path.join(__dirname, 'schema.sql');

// Ensures the database is running before the backend uses it
const seed = async (): Promise<void> => {
  // Checks if the database name is defined by the container
  if (process.env.DB_HOST === 'postgres-db') {
    // Create a promise that will later return a string
    const ip = await new Promise<string>((resolve, reject) => {
      // Locates the database address
      dns.lookup('postgres-db', (err, address) => {
        if (err) {
          reject(err);
        } else {
          resolve(address);
        }
      });

      // Sets the sequelize endpoints
      (sequelize as any).options.host = ip;
      (sequelize.config as any).host = ip;
      (sequelize.connectionManager as any).config.host = ip;
    });
    /* const lookup = async (): Promise<string> ((resolve, reject) => {
      const add: string = await dns.lookup('postgres-db', (err, address) => {
        if (err) {
          reject(err)
        } else {
          resolve(address);
          console.log(`Running at ${address}`);
        }
          // Updates sequelize endpoints
          sequelize.host.options = add;
          (sequelize.config as any).host = add;
          (sequelize.connectionManager as any).config.host = add;
        }
      }) */
    }
}