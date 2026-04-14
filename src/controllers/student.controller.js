import { Student, Class, School } from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  successResponse(res, 201, 'Student created', student);
};

export const getStudents = async (req, res) => {
  const { school_id, class_id } = req.query;
  const where = {};
  if (school_id) where.school_id = school_id;
  if (class_id) where.class_id = class_id;

  const students = await Student.findAll({
    where,
    include: [{ model: Class, as: 'class' }, { model: School, as: 'school' }]
  });
  successResponse(res, 200, 'Students retrieved', students);
};

export const getStudentById = async (req, res) => {
  const student = await Student.findByPk(req.params.id, {
    include: [{ model: Class, as: 'class' }]
  });
  if (!student) return errorResponse(res, 404, 'Student not found');
  successResponse(res, 200, 'Student retrieved', student);
};

export const updateStudent = async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return errorResponse(res, 404, 'Student not found');

  await student.update(req.body);
  successResponse(res, 200, 'Student updated', student);
};

export const deleteStudent = async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return errorResponse(res, 404, 'Student not found');

  await student.destroy();
  successResponse(res, 200, 'Student deleted');
};
