const { STATUS_CODES } = require('../../utils/common');
const { errorResponse } = require('../../utils/response');

const createGameDetailsValidator = async (req, res, next) => {
  try {
    const { playerStatistics, gameResults } = req.body;
    if (!playerStatistics || !gameResults) {
      throw {
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
        message: 'Required parameters missing',
      };
    }

    next();
  } catch (error) {
    errorResponse({ error, res });
  }
};

module.exports = {
  createGameDetailsValidator,
};
