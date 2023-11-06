const bcrypt = require('bcrypt');

const { User } = require('../../models');
const { STATUS_CODES } = require('../../utils/common');
const { errorResponse } = require('../../utils/response');

const validateRegisterUser = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      throw {
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: 'Required parameters missing!',
      };
    }

    if (password !== confirmPassword) {
      throw {
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: 'password and confirm password mismatched',
      };
    }

    const [userWithUsername, userWithEmail] = await Promise.all([
      User.findOne({ where: { username } }),
      User.findOne({ where: { email } }),
    ]);

    if (userWithUsername) {
      throw {
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: 'username already exists',
      };
    }
    if (userWithEmail) {
      throw {
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: 'email already exists',
      };
    }

    next();
  } catch (error) {
    errorResponse({ error, res });
  }
};

const validateLoginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw {
        code: STATUS_CODES.UNAUTHORIZED,
        message: 'Invalid username or password',
      };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw {
        code: STATUS_CODES.UNAUTHORIZED,
        message: 'Invalid username or password',
      };
    }

    next();
  } catch (error) {
    errorResponse({ error, res });
  }
};

module.exports = {
  validateRegisterUser,
  validateLoginUser,
};
