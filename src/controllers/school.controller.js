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

export const uploadSchoolAsset = async (req, res) => {
  if (!req.file) return apiResponse(res, 400, 'No file uploaded');
  const { type } = req.body; // logo, signature, stamp, principal_stamp

  const school = await School.findByPk(req.params.id);
  if (!school) return apiResponse(res, 404, 'School not found');

  const url = `uploads/profiles/${req.file.filename}`;
  const updates = {};

  if (type === 'logo') updates.logo_url = url;
  else if (type === 'signature') updates.signature_url = url;
  else if (type === 'stamp') updates.stamp_url = url;
  else if (type === 'principal_stamp') updates.principal_stamp_url = url;
  else return apiResponse(res, 400, 'Invalid asset type');

  await school.update(updates);
  apiResponse(res, 200, `${type} updated successfully`, { url });
};

export const deleteSchool = async (req, res) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return apiResponse(res, 404, 'School not found');

  await school.destroy();
  apiResponse(res, 200, 'School deleted');
};
