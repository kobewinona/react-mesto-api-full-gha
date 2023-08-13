const allowedCors = require('../utils/allowedCors');

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  const ALLOWED_METHODS = 'GET,POST,PUT,PATCH,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', 'true');

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Max-Age', '500');
    return res.end();
  }

  return next();
};
