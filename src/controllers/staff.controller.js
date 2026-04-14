import { Staff, School } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createStaff = async (req, res) => {
  const staff = await Staff.create(req.body);
  successResponse(res, 201, 'Staff created', staff);
};

export const getStaff = async (req, res) => {
  const { school_id } = req.query;
  const where = {};
  if (school_id) where.school_id = school_id;

  const staff = await Staff.findAll({ where, include: [{ model: School, as: 'school' }] });
  successResponse(res, 200, 'Staff retrieved', staff);
};

export const getStaffById = async (req, res) => {
  const staff = await Staff.findByPk(req.params.id);
  if (!staff) return errorResponse(res, 404, 'Staff not found');
  successResponse(res, 200, 'Staff retrieved', staff);
};

export const updateStaff = async (req, res) => {
  const staff = await Staff.findByPk(req.params.id);
  if (!staff) return errorResponse(res, 404, 'Staff not found');

  await staff.update(req.body);
  successResponse(res, 200, 'Staff updated', staff);
};

export const deleteStaff = async (req, res) => {
  const staff = await Staff.findByPk(req.params.id);
  if (!staff) return errorResponse(res, 404, 'Staff not found');

  await staff.destroy();
  successResponse(res, 200, 'Staff deleted');
};
