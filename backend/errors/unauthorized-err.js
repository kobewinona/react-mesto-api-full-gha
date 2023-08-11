const { UNAUTHORIZED } = require('../utils/statusCodes');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED;
  }
};
