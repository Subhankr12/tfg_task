const { User, Game } = require('../../models');

const createGameDetails = async (params) => {
  const { userId, playerStatistics, gameResults } = params;
  const user = await User.findOne({ where: { id: userId } });

  const newGame = new Game({
    userId,
    username: user.username,
    playerStatistics,
    gameResults,
  });

  await newGame.save();
};

const getGameDetails = async (params) => {
  const { userId } = params;
  const gameDetails = await Game.find({ userId });

  return gameDetails;
};

const updateGameDetails = async (params) => {
  const { gameDetailsId, playerStatistics, gameResults } = params;

  await Game.findByIdAndUpdate(gameDetailsId, {
    playerStatistics,
    gameResults,
  });
};

const deleteGameDetails = async (params) => {
  const { gameDetailsId } = params;
  await Game.findByIdAndDelete(gameDetailsId);
};

module.exports = {
  createGameDetails,
  getGameDetails,
  updateGameDetails,
  deleteGameDetails,
};
