import { apiResponse } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    // Combine all validation errors into the message string
    message = err.errors.map(e => e.message).join(', ');
    return apiResponse(res, statusCode, message);
  }

  return apiResponse(res, statusCode, message);
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
