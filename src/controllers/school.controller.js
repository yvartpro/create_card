import { School } from '../models/index.js';
import { apiResponse } from '../utils/response.js';

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

  apiResponse(res, 201, 'School created successfully', school);
};

export const getSchools = async (req, res) => {
  let where = {};

  if (req.user.role !== 'ADMIN') {
    if (req.user.school_id) {
      where.id = req.user.school_id;
    } else {
      where.owner_id = req.user.id;
    }
  }
  
  const schools = await School.findAll({ where });
  apiResponse(res, 200, 'Schools retrieved', schools);
};

export const getSchoolById = async (req, res) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return apiResponse(res, 404, 'School not found');
  apiResponse(res, 200, 'School retrieved', school);
};

export const updateSchool = async (req, res) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return apiResponse(res, 404, 'School not found');

  await school.update(req.body);
  apiResponse(res, 200, 'School updated', school);
};

export const deleteSchool = async (req, res) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return apiResponse(res, 404, 'School not found');

  await school.destroy();
  apiResponse(res, 200, 'School deleted');
};
