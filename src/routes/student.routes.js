import express from 'express';
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/student.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudent)
  .get(protect, getStudents);

router.route('/:id')
  .get(protect, getStudentById)
  .put(protect, updateStudent)
  .delete(protect, adminOnly, deleteStudent);

export default router;
