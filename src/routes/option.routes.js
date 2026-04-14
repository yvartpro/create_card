import express from 'express';
import { createOption, getOptions, getOptionById, updateOption, deleteOption } from '../controllers/option.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createOption)
  .get(protect, getOptions);

router.route('/:id')
  .get(protect, getOptionById)
  .put(protect, adminOnly, updateOption)
  .delete(protect, adminOnly, deleteOption);

export default router;
