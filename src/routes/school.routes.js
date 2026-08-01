import express from 'express';
import { createSchool, getSchools, getSchoolById, updateSchool, deleteSchool, uploadSchoolAsset } from '../controllers/school.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createSchool)
  .get(protect, getSchools);

router.post('/:id/assets', protect, upload.single('file'), uploadSchoolAsset);

router.route('/:id')
  .get(protect, getSchoolById)
  .patch(protect, updateSchool)
  .delete(protect, adminOnly, deleteSchool);

export default router;
