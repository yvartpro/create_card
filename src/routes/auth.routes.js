import express from 'express';
import { login, register, logout } from '../controllers/auth.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', protect, adminOnly, register);
router.post('/logout', protect, logout);

export default router;
