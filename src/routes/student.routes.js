import express from 'express';
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent, bulkCreateStudents } from '../controllers/student.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStudent)
  .get(protect, getStudents);

router.post('/bulk', protect, bulkCreateStudents);

router.route('/:id')
  .get(protect, getStudentById)
  .patch(protect, updateStudent)
  .delete(protect, adminOnly, deleteStudent);

export default router;
