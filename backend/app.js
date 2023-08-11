/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const indexRouter = require('./routes/index');
const NotFoundError = require('./errors/not-found-err');
const handleError = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/', indexRouter);

app.use(errorLogger);

app.use(errors());

app.all('*', (req, res, next) => {
  next(new NotFoundError('Что-то пошло не так...'));
});

app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at port ${PORT}`);
});
