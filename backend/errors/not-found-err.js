const { NOT_FOUND } = require('../utils/statusCodes');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND;
  }
};
