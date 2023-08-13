// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { token } = req.cookies;

  if (!token) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  req.user = payload;

  next();
};
