import express from 'express';
import { createSchool, getSchools, getSchoolById, updateSchool, deleteSchool } from '../controllers/school.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createSchool)
  .get(protect, getSchools);

router.route('/:id')
  .get(protect, getSchoolById)
  .put(protect, adminOnly, updateSchool)
  .delete(protect, adminOnly, deleteSchool);

export default router;
