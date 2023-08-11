const mongoose = require('mongoose');

const { urlRegex } = require('../utils/regex');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле должно содержать более 2 символов'],
    maxlength: [30, 'Поле должно содержать не более 30 символов'],
    required: [true, 'Поле должно быть заполнено'],
  },
  link: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(value) {
        return urlRegex.test(value);
      },
      message: 'Поле должно содержать URL адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);
