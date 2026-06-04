const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');

// Middleware to protect routes and attach decoded user to req.user
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization || req.cookies?.token;
  let token = null;
  if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) return next(new ErrorHandler('Unauthorized: No token provided', 401));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ErrorHandler('Invalid or expired token', 401));
  }
};
