const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Game = require('./game');

module.exports = {
  User: require('./user')(sequelize, DataTypes),
  Game,
};
