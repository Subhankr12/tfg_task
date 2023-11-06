const { successResponse, errorResponse } = require('../../utils/response');
const userService = require('./service');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userService.registerUser({ username, email, password });

    successResponse({
      message: 'User registered successfully.',
      data: {
        user,
      },
      res,
    });
  } catch (error) {
    errorResponse({
      message: 'An error occurred while registering.',
      error,
      res,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username } = req.body;
    const token = await userService.loginUser({ username });

    successResponse({
      message: 'User logged in successfully',
      data: { token },
      res,
    });
  } catch (error) {
    errorResponse({
      message: 'Failed to login',
      error,
      res,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
