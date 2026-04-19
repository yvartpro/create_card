import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { errorResponse } from '../utils/response.js';

export const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 401, 'Not authorized, no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    
    if (!req.user) {
      return errorResponse(res, 401, 'Not authorized, user not found');
    }
    
    next();
  } catch (error) {
    return errorResponse(res, 401, 'Not authorized, token failed');
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return errorResponse(res, 403, 'Not authorized as an admin');
  }
};
