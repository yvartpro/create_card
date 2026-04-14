import { errorResponse } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    const errors = err.errors.map(e => e.message);
    return errorResponse(res, statusCode, message, errors);
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    message = 'Duplicate field value entered';
    const errors = err.errors.map(e => e.message);
    return errorResponse(res, statusCode, message, errors);
  }

  return errorResponse(res, statusCode, message, process.env.NODE_ENV === 'development' ? err.stack : null);
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
