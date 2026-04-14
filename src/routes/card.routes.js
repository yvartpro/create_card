import express from 'express';
import { generateCard, downloadCard } from '../controllers/card.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/generate', protect, generateCard);
router.get('/:id/download', protect, downloadCard);

export default router;
