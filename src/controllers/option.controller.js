import { Option, School } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createOption = async (req, res) => {
  const { name, school_id } = req.body;
  if (!name || !school_id) return errorResponse(res, 400, 'Name and school_id are required');

  const option = await Option.create({ name, school_id });
  successResponse(res, 201, 'Option created successfully', option);
};

export const getOptions = async (req, res) => {
  const { school_id } = req.query;
  const where = {};
  if (school_id) where.school_id = school_id;

  const options = await Option.findAll({ where, include: [{ model: School, as: 'school' }] });
  successResponse(res, 200, 'Options retrieved', options);
};

export const getOptionById = async (req, res) => {
  const option = await Option.findByPk(req.params.id);
  if (!option) return errorResponse(res, 404, 'Option not found');
  successResponse(res, 200, 'Option retrieved', option);
};

export const updateOption = async (req, res) => {
  const option = await Option.findByPk(req.params.id);
  if (!option) return errorResponse(res, 404, 'Option not found');

  await option.update(req.body);
  successResponse(res, 200, 'Option updated', option);
};

export const deleteOption = async (req, res) => {
  const option = await Option.findByPk(req.params.id);
  if (!option) return errorResponse(res, 404, 'Option not found');

  await option.destroy();
  successResponse(res, 200, 'Option deleted');
};
