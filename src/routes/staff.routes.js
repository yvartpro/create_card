import express from 'express';
import { createStaff, getStaff, getStaffById, updateStaff, deleteStaff, uploadPhoto } from '../controllers/staff.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.patch('/:id/photo', protect, upload.single('photo'), uploadPhoto);

router.route('/')
  .post(protect, createStaff)
  .get(protect, getStaff);

router.route('/:id')
  .get(protect, getStaffById)
  .patch(protect, updateStaff)
  .delete(protect, deleteStaff);

export default router;
