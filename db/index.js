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
  no: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typing: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // defensiveUtility: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false
  // },
  defensiveResist: {
    type:DataTypes.STRING,
    allowNull: false
  },
  defensiveWeak: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    allowNull: false
  },
  offensiveCompliment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  momentumFollowup: {
    type: DataTypes.STRING,
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
  hazardRemoval: {
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
  }
}, {
  timestamps: false
});

// const Team = sequelize.define('team', {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   typeMatchups: {
//     type: DataTypes.JSON,
//     allowNull: false
//   }
// }, {
//   timestamps: false
// });


// Pokemon.belongsTo(Team);
// Team.hasMany(Pokemon);


module.exports = {
  sequelize,
  Pokemon,
  // Team
};