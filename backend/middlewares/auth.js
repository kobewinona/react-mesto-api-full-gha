// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;

  next();
};
