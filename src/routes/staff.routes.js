import express from 'express';
import { createStaff, getStaff, getStaffById, updateStaff, deleteStaff } from '../controllers/staff.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createStaff)
  .get(protect, getStaff);

router.route('/:id')
  .get(protect, getStaffById)
  .put(protect, updateStaff)
  .delete(protect, adminOnly, deleteStaff);

export default router;
