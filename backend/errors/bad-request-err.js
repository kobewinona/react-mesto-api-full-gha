const { BAD_REQUEST } = require('../utils/statusCodes');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST;
  }
};
