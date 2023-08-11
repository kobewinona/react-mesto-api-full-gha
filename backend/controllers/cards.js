const mongoose = require('mongoose');

const Card = require('../models/card');
const { OK } = require('../utils/statusCodes');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(next);
};

const addCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(OK).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Card.findById(req.params.id)
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Запрашиваемая карточка места не найдена');
        }

        if (card && card.owner.equals(req.user._id)) {
          Card.deleteOne(card)
            .then(() => {
              res.status(OK).send(card);
            })
            .catch(next);
        } else {
          throw new ForbiddenError('У Вас нет прав для совершения данного действия');
        }
      })
      .catch(next);
  } else {
    next(new BadRequestError('Данные введены некорректно'));
  }
};

const updateCardLikes = (req, res, next, operation) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Card.findByIdAndUpdate(
      req.params.id,
      { [operation]: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Запрашиваемая карточка места не найдена');
        } else {
          res.status(OK).send(card);
        }
      })
      .catch(next);
  } else {
    next(new BadRequestError('Данные введены некорректно'));
  }
};

const puttingCardLikeDecorator = (putLike) => (req, res, next) => putLike(req, res, next, '$addToSet');
const deletingCardLikeDecorator = (deleteLike) => (req, res, next) => deleteLike(req, res, next, '$pull');

const putLike = puttingCardLikeDecorator(updateCardLikes);
const deleteLike = deletingCardLikeDecorator(updateCardLikes);

module.exports = {
  getCards, addCard, deleteCard, putLike, deleteLike,
};
