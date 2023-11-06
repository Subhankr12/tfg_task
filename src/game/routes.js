const express = require('express');
const gameController = require('./controllers');
const gameValidator = require('./middleware');

const gameRouter = express.Router();

gameRouter.post(
  '/',
  gameValidator.createGameDetailsValidator,
  gameController.createGameDetails
);
gameRouter.get('/', gameController.getGameDetails);
gameRouter.put('/:id', gameController.updateGameDetails);
gameRouter.delete('/:id', gameController.deleteGameDetails);

module.exports = gameRouter;
