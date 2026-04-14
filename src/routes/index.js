import express from 'express';
import authRoutes from './auth.routes.js';
import schoolRoutes from './school.routes.js';
import studentRoutes from './student.routes.js';
import staffRoutes from './staff.routes.js';
import cardRoutes from './card.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/schools', schoolRoutes);
router.use('/students', studentRoutes);
router.use('/staff', staffRoutes);
router.use('/cards', cardRoutes);

export default router;
