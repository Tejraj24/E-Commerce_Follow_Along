// Simple validation middleware factory
const ErrorHandler = require('../utils/ErrorHandler');

const validateBody = (requiredFields = []) => (req, res, next) => {
  const missing = requiredFields.filter((f) => req.body[f] === undefined || req.body[f] === '');
  if (missing.length) return next(new ErrorHandler(`Missing required fields: ${missing.join(', ')}`, 400));
  next();
};

module.exports = { validateBody };
