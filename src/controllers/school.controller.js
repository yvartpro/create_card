import { School } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createSchool = async (req, res) => {
  const { name, code, logo_url, signature_url, stamp_url, principal_stamp_url } = req.body;

  const school = await School.create({
    name,
    code,
    logo_url,
    signature_url,
    stamp_url,
    principal_stamp_url,
    owner_id: req.user.id
  });

  successResponse(res, 201, 'School created successfully', school);
};

export const getSchools = async (req, res) => {
  // If operator, maybe they only see schools they belong to. But prompt says admin users manage multiple schools.
  // We will return all schools for the admin.
  let where = {};
  if (req.user.role !== 'ADMIN') {
    where.owner_id = req.user.id;
  }
  
  const schools = await School.findAll({ where });
  successResponse(res, 200, 'Schools retrieved', schools);
};

export const getSchoolById = async (req, res) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return errorResponse(res, 404, 'School not found');
  successResponse(res, 200, 'School retrieved', school);
};

export const updateSchool = async (req, res) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return errorResponse(res, 404, 'School not found');

  await school.update(req.body);
  successResponse(res, 200, 'School updated', school);
};

export const deleteSchool = async (req, res) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return errorResponse(res, 404, 'School not found');

  await school.destroy();
  successResponse(res, 200, 'School deleted');
};
