const { FORBIDDEN } = require('../utils/statusCodes');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN;
  }
};
