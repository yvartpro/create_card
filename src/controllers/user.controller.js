import { User, School } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createOperator = async (req, res) => {
  const { name, email, password, school_id } = req.body;
  
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return errorResponse(res, 400, 'Email already in use');

  const user = await User.create({
    name,
    email,
    password,
    school_id,
    role: 'OPERATOR'
  });

  successResponse(res, 201, 'Operator created successfully', user);
};

export const getOperators = async (req, res) => {
  const operators = await User.findAll({
    where: { role: 'OPERATOR' },
    include: [{ model: School, as: 'school' }]
  });
  successResponse(res, 200, 'Operators retrieved', operators);
};

export const getOperatorById = async (req, res) => {
  const operator = await User.findOne({
    where: { id: req.params.id, role: 'OPERATOR' },
    include: [{ model: School, as: 'school' }]
  });
  if (!operator) return errorResponse(res, 404, 'Operator not found');
  successResponse(res, 200, 'Operator retrieved', operator);
};

export const updateOperator = async (req, res) => {
  const operator = await User.findOne({
    where: { id: req.params.id, role: 'OPERATOR' }
  });
  if (!operator) return errorResponse(res, 404, 'Operator not found');

  if (req.body.password === '') delete req.body.password;

  await operator.update(req.body);
  successResponse(res, 200, 'Operator updated', operator);
};

export const deleteOperator = async (req, res) => {
  const operator = await User.findOne({
    where: { id: req.params.id, role: 'OPERATOR' }
  });
  if (!operator) return errorResponse(res, 404, 'Operator not found');

  await operator.destroy();
  successResponse(res, 200, 'Operator deleted');
};
