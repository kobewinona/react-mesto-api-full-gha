// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { OK } = require('../utils/statusCodes');

const login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findUserByCredentials(req.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      const oneDayMilliseconds = 24 * 60 * 60 * 1000;
      const maxAge = 7 * oneDayMilliseconds;

      res.cookie('token', token, { maxAge, httpOnly: true, sameSite: true });

      // eslint-disable-next-line no-param-reassign
      user.password = undefined;

      res.status(OK).send(user);
    })
    .catch(next);
};

module.exports = login;
