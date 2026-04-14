import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register); // Optional: if you want manual admin creation initially

export default router;
