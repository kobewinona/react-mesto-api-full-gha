const { OK } = require('../utils/statusCodes');

const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0), httpOnly: true, sameSite: true });
  res.status(OK).send({ message: 'Выход прошел успешно' });
};

module.exports = logout;
