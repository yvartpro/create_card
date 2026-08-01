import express from 'express';
import { createStudent, getStudents, getStudentById, updateStudent, deleteStudent, bulkCreateStudents, uploadPhoto } from '../controllers/student.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.patch('/:id/photo', protect, upload.single('photo'), uploadPhoto);

router.route('/')
  .post(protect, createStudent)
  .get(protect, getStudents);

router.post('/bulk', protect, bulkCreateStudents);

router.route('/:id')
  .get(protect, getStudentById)
  .patch(protect, updateStudent)
  .delete(protect, deleteStudent);

export default router;
