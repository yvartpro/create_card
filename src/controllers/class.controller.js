import { Class, Option, School } from '../models/index.js';
import { apiResponse } from '../utils/response.js';

export const createClass = async (req, res) => {
  const { name, option_id, school_id } = req.body;
  if (!name || !school_id) return apiResponse(res, 400, 'Name and school_id are required');

  const newClass = await Class.create({ name, option_id, school_id });
  apiResponse(res, 201, 'Class created successfully', newClass);
};

export const getClasses = async (req, res) => {
  const { school_id, option_id } = req.query;
  const where = {};
  if (school_id) where.school_id = school_id;
  if (option_id) where.option_id = option_id;

  const classes = await Class.findAll({ 
    where, 
    include: [
      { model: School, as: 'school' },
      { model: Option, as: 'option' }
    ] 
  });
  apiResponse(res, 200, 'Classes retrieved', classes);
};

export const getClassById = async (req, res) => {
  const cls = await Class.findByPk(req.params.id, {
    include: [{ model: Option, as: 'option' }]
  });
  if (!cls) return apiResponse(res, 404, 'Class not found');
  apiResponse(res, 200, 'Class retrieved', cls);
};

export const updateClass = async (req, res) => {
  const cls = await Class.findByPk(req.params.id);
  if (!cls) return apiResponse(res, 404, 'Class not found');

  await cls.update(req.body);
  apiResponse(res, 200, 'Class updated', cls);
};

export const deleteClass = async (req, res) => {
  const cls = await Class.findByPk(req.params.id);
  if (!cls) return apiResponse(res, 404, 'Class not found');

  await cls.destroy();
  apiResponse(res, 200, 'Class deleted');
};
