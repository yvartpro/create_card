import express from 'express';
import { createOperator, getOperators, getOperatorById, updateOperator, deleteOperator } from '../controllers/user.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.route('/')
  .post(createOperator)
  .get(getOperators);

router.route('/:id')
  .get(getOperatorById)
  .put(updateOperator)
  .delete(deleteOperator);

export default router;
