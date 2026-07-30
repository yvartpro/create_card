import { Staff, School } from '../models/index.js';
import { apiResponse } from '../utils/response.js';

export const createStaff = async (req, res) => {
  const staff = await Staff.create(req.body);
  apiResponse(res, 201, 'Staff created', staff);
};

export const getStaff = async (req, res) => {
  const { school_id } = req.query;
  const where = {};
  if (school_id) where.school_id = school_id;

  const staff = await Staff.findAll({ where, include: [{ model: School, as: 'school' }] });
  apiResponse(res, 200, 'Staff retrieved', staff);
};

export const getStaffById = async (req, res) => {
  const staff = await Staff.findByPk(req.params.id);
  if (!staff) return apiResponse(res, 404, 'Staff not found');
  apiResponse(res, 200, 'Staff retrieved', staff);
};

export const updateStaff = async (req, res) => {
  const staff = await Staff.findByPk(req.params.id);
  if (!staff) return apiResponse(res, 404, 'Staff not found');

  await staff.update(req.body);
  apiResponse(res, 200, 'Staff updated', staff);
};

export const deleteStaff = async (req, res) => {
  const staff = await Staff.findByPk(req.params.id);
  if (!staff) return apiResponse(res, 404, 'Staff not found');

  await staff.destroy();
  apiResponse(res, 200, 'Staff deleted');
};
