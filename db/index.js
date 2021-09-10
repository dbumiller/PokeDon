const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('pokedon', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Pokemon = sequelize.define('pokemon', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
    allowNull: false
  },
  defensiveWeak: {
    type: DataTypes.JSON,
    allowNull: false
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
    allowNull: false
  },
  offensiveCompliment: {
    type: DataTypes.JSON,
    allowNull: false
  },
  momentumFollowup: {
    type: DataTypes.JSON,
    allowNull: false
  },
  momentousLeadIn: {
    type: DataTypes.JSON,
    allowNull: false
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
    allowNull: false
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
    allowNull: false
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
    allowNull: false
  },
  defensiveUtility: {
    type:DataTypes.BOOLEAN,
    allowNull: false
  },
  teamId: {
    type:DataTypes.INTEGER,
    references: 'teams',
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