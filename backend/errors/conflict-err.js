const { CONFLICT } = require('../utils/statusCodes');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT;
  }
};
