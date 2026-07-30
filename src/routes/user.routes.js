import express from 'express';
import { createOperator, getOperators, getOperatorById, updateOperator, deleteOperator } from '../controllers/user.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);
router.use(adminOnly);

// Collection routes
router.get('/', getOperators);
router.post('/', createOperator);

// Individual resource routes
router.get('/:id', getOperatorById);
router.patch('/:id', updateOperator);
router.delete('/:id', deleteOperator);

export default router;
