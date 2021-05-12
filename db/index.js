const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('to be determined', 'root', '') {
  host: 'localhost',
  dialect: 'mysql'
};

const Pokemon = sequelize.define('pokemon', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
  no: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.String,
    allowNull: false
  }
})

module.exports = MULTIPLE THINGS??