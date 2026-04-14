import express from 'express';
import { createClass, getClasses, getClassById, updateClass, deleteClass } from '../controllers/class.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createClass)
  .get(protect, getClasses);

router.route('/:id')
  .get(protect, getClassById)
  .put(protect, adminOnly, updateClass)
  .delete(protect, adminOnly, deleteClass);

export default router;
