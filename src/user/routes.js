const express = require('express');
const userController = require('./controllers');
const userMiddleware = require('./middleware');

const userRouter = express.Router();

userRouter.post(
  '/register',
  userMiddleware.validateRegisterUser,
  userController.registerUser
);
userRouter.post(
  '/login',
  userMiddleware.validateLoginUser,
  userController.loginUser
);

module.exports = userRouter;
