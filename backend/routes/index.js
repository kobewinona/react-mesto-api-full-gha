/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlRegex, idRegex } = require('../utils/regex');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const auth = require('../middlewares/auth');
const {
  getUsers, getCurrentUser, getUser, updateUserInfo, updateUserAvatar, createUser,
} = require('../controllers/users');
const {
  getCards, addCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

// auth routes

router.post('/sign-up', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex),
  }),
}, { abortEarly: false }), createUser);
router.post('/sign-in', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, { abortEarly: false }), login);
router.post('/sign-out', logout);

// auth middleware

router.use(auth);

// user routes

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(idRegex).required(),
  }),
}), getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}, { abortEarly: false }), updateUserInfo);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex).required(),
  }),
}, { abortEarly: false }), updateUserAvatar);

// card routes

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegex).required(),
  }),
}, { abortEarly: false }), addCard);
router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(idRegex).required(),
  }),
}), deleteCard);
router.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(idRegex).required(),
  }),
}), putLike);
router.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(idRegex).required(),
  }),
}), deleteLike);

module.exports = router;
