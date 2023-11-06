const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  playerStatistics: Object,
  gameResults: Object,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
