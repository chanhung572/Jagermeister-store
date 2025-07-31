const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATE_KEY);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};