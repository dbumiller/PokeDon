// ORM technology that provides javascript-like syntax for interacting with an SQL database, DataTypes lets me access built-in data types
const {Sequelize, DataTypes} = require('sequelize');

// Provides default variables for when used on my own computer
const dbName = process.env.DB_NAME || 'pokedon';
const dbUser = process.env.DB_USER || 'donaldbumiller';
const dbPass = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || '127.0.0.1';

// Creates a database connection variable accessing the 'pokedon' database as the root user with no password
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  // Where the server is hosted
  // host: 'localhost',
  host: dbHost,
  // Postgres port
  port: 5432,
  // Using mysql
  dialect: 'postgres',
  logging: false
});

// Creates a model called Pokemon that is connected to the 'pokemon' part of the database
const Pokemon = sequelize.define('pokemon', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Uniquely identifies each record in a table
    primaryKey: true,
    autoIncrement: true
  },
  // no: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typing: {
    type: DataTypes.JSON,
    allowNull: false
  },
  // defensiveUtility: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false
  // },
  defensiveResist: {
    type:DataTypes.JSON,
    allowNull: false,
    field: 'defensive_resist'
  },
  defensiveWeak: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'defensive_weak'
  },
  // offensiveSE: {
  //   type: DataTypes.ARRAY(DataTypes.STRING),
  //   allowNull: false
  // },
  // offensiveNVE: {
  //   type: DataTypes.ARRAY(DataTypes.STRING),
  //   allowNull: false
  // },
  // offensiveEffectiveness: {
  //   type: DataTypes.JSON,
  //   allowNull: false
  // },
  // defensiveEffectiveness: {
  //   type: DataTypes.JSON,
  //   allowNull: false
  // },
  offensiveSynergy: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'offensive_synergy'
  },
  offensiveCompliment: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'offensive_compliment'
  },
  momentumFollowup: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'momentum_followup'
  },
  momentousLeadIn: {
    type: DataTypes.JSON,
    allowNull: false,
    field: 'momentous_lead_in'
  },
  wallbreaker: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  sweeper: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  hazardControl: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'hazard_control'
  },
  rocker: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  spiker: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  tSpiker: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 't_spiker'
  },
  webber: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  screener: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  priority: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  momentum: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  speedControl: {
    type:DataTypes.BOOLEAN,
    allowNull: false,
    field: 'speed_control'
  },
  defensiveUtility: {
    type:DataTypes.BOOLEAN,
    allowNull: false,
    field: 'defensive_utility'
  },
  locked: {
    type:DataTypes.BOOLEAN
  },
  speed: {
    type:DataTypes.INTEGER,
    allowNull: false
  },
  attackingStat: {
    type:DataTypes.STRING,
    allowNull: false,
    field: 'attacking_stat'
  },
  teamId: {
    type:DataTypes.INTEGER,
    // Pokemon is related to the teams part of the database
    references: 'teams',
    // 'teamId' is the foreign key
    referencesKey: 'teamId'
  }
}, {
  timestamps: false
});

const Team = sequelize.define('team', {
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  defense: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  timestamps: false
});


// Pokemon.belongsTo(Team);
// Team.hasMany(Pokemon);


module.exports = {
  sequelize,
  Pokemon,
  Team
};