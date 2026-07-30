import { User, School } from '../models/index.js';
import { apiResponse } from '../utils/response.js';

export const createOperator = async (req, res) => {
  const { name, email, password, school_id } = req.body;
  
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return apiResponse(res, 400, 'Email already in use');

  const user = await User.create({
    name,
    email,
    password,
    school_id,
    role: 'OPERATOR'
  });

  apiResponse(res, 201, 'Operator created successfully', user);
};

export const getOperators = async (req, res) => {
  const operators = await User.findAll({
    where: { role: 'OPERATOR' },
    include: [{ model: School, as: 'school' }]
  });
  apiResponse(res, 200, 'Operators retrieved', operators);
};

export const getOperatorById = async (req, res) => {
  const operator = await User.findOne({
    where: { id: req.params.id, role: 'OPERATOR' },
    include: [{ model: School, as: 'school' }]
  });
  if (!operator) return apiResponse(res, 404, 'Operator not found');
  apiResponse(res, 200, 'Operator retrieved', operator);
};

export const updateOperator = async (req, res) => {
  const operator = await User.findOne({
    where: { id: req.params.id, role: 'OPERATOR' }
  });
  if (!operator) return errorResponse(res, 404, 'Operator not found');

  if (req.body.password === '') delete req.body.password;

  await operator.update(req.body);

  // Reload to get associations
  const updatedOperator = await User.findOne({
    where: { id: operator.id },
    include: [{ model: School, as: 'school' }]
  });
  
  apiResponse(res, 200, 'Operator updated', updatedOperator);
};

export const deleteOperator = async (req, res) => {
  const operator = await User.findOne({
    where: { id: req.params.id, role: 'OPERATOR' }
  });
  if (!operator) return apiResponse(res, 404, 'Operator not found');

  await operator.destroy();
  apiResponse(res, 200, 'Operator deleted');
};
