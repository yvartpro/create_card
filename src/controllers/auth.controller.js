import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, 'Please provide email and password');
  }

  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.comparePassword(password))) {
    return errorResponse(res, 401, 'Invalid credentials');
  }

  const token = generateToken(user.id);

  successResponse(res, 200, 'Login successful', {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token: token
  });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return errorResponse(res, 400, 'User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'OPERATOR'
  });

  const token = generateToken(user.id);

  successResponse(res, 201, 'User registered', {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token
  });
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  successResponse(res, 200, 'Logout successful');
};
