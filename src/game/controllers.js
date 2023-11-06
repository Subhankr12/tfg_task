const { successResponse, errorResponse } = require('../../utils/response');
const gameService = require('./service');

const createGameDetails = async (req, res) => {
  try {
    const { userId } = req.user;
    const { playerStatistics, gameResults } = req.body;

    await gameService.createGameDetails({
      userId,
      playerStatistics,
      gameResults,
    });

    successResponse({
      message: 'Game details created successfully.',
      res,
    });
  } catch (error) {
    errorResponse({
      message: 'Failed to create game details.',
      error,
      res,
    });
  }
};

const getGameDetails = async (req, res) => {
  try {
    const { userId } = req.user;
    const gameDetails = await gameService.getGameDetails({
      userId,
    });

    successResponse({
      message: 'Game details retrieved successfully',
      data: { gameDetails },
      res,
    });
  } catch (error) {
    errorResponse({
      message: 'Failed to retrieve game details',
      error,
      res,
    });
  }
};

const updateGameDetails = async (req, res) => {
  try {
    const { playerStatistics, gameResults } = req.body;
    const { id: gameDetailsId } = req.params;
    await gameService.updateGameDetails({
      gameDetailsId,
      playerStatistics,
      gameResults,
    });

    successResponse({
      message: 'Game details updated successfully.',
      res,
    });
  } catch (error) {
    errorResponse({
      message: 'Failed to update game details.',
      error,
      res,
    });
  }
};

const deleteGameDetails = async (req, res) => {
  try {
    const { id: gameDetailsId } = req.params;
    await gameService.deleteGameDetails({ gameDetailsId });

    successResponse({
      message: 'Game details deleted successfully',
      res,
    });
  } catch (error) {
    errorResponse({
      message: 'Failed to delete game details',
      error,
      res,
    });
  }
};

module.exports = {
  createGameDetails,
  getGameDetails,
  updateGameDetails,
  deleteGameDetails,
};
