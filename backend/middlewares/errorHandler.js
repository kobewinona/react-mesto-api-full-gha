const mongoose = require('mongoose');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../utils/statusCodes');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(err.errors).map((error) => {
      const { path, message } = error.properties;
      return `Ошибка в поле ${path}: ${message}.`;
    });

    return res.status(BAD_REQUEST).send({ message: errorMessages.join(' ') });
  }

  if (!err.status) {
    return res.status(INTERNAL_SERVER_ERROR).send({
      message: 'На сервере произошла ошибка',
    });
  }

  return res.status(err.status).send({ message: err.message });
};
