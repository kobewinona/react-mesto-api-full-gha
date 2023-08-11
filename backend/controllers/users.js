const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { OK } = require('../utils/statusCodes');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(OK).send(user))
    .catch(next);
};

const getUser = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Пользователя с текущим ID не существует');
        } else {
          res.status(OK).send(user);
        }
      })
      .catch(next);
  } else {
    next(new BadRequestError('Данные введены некорректно'));
  }
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => {
      User.create({ ...req.body, password: hash })
        .then((user) => {
          // eslint-disable-next-line no-param-reassign
          user.password = undefined;
          res.status(OK).send(user);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким Email уже существует'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const updateUserData = (req, res, next, userData) => {
  User.findByIdAndUpdate(
    req.user._id,
    userData,
    { new: true, runValidators: true },
  )
    .then((user) => res.status(OK).send(user))
    .catch(next);
};

const updatingUserInfoDecorator = (updateUserInfo) => (req, res, next) => updateUserInfo(
  req,
  res,
  next,
  { name: req.body.name, about: req.body.about },
);

const updateUserInfo = updatingUserInfoDecorator(updateUserData);

const updatingUserAvatarDecorator = (updateUserAvatar) => (req, res, next) => updateUserAvatar(
  req,
  res,
  next,
  { avatar: req.body.avatar },
);

const updateUserAvatar = updatingUserAvatarDecorator(updateUserData);

module.exports = {
  getUsers, getCurrentUser, getUser, createUser, updateUserInfo, updateUserAvatar,
};
