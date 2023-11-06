const jwt = require('jsonwebtoken');
const { STATUS_CODES } = require('./common');
const { errorResponse } = require('./response');

const verifyToken = (req, res, next) => {
  try {
    // Verify JWT before allowing access
    const token = req.headers['authorization'];
    if (!token) {
      throw {
        code: STATUS_CODES.UNAUTHORIZED,
        message: 'Access denied',
      };
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
      throw {
        code: STATUS_CODES.UNAUTHORIZED,
        message: 'Invalid token',
      };
    }

    req.user = verified;
    next();
  } catch (error) {
    errorResponse({
      error,
      res,
    });
  }
};

module.exports = {
  verifyToken,
};
