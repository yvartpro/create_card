import express from 'express';
import authRoutes from './auth.routes.js';
import schoolRoutes from './school.routes.js';
import studentRoutes from './student.routes.js';
import staffRoutes from './staff.routes.js';
import cardRoutes from './card.routes.js';
import optionRoutes from './option.routes.js';
import classRoutes from './class.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/schools', schoolRoutes);
router.use('/options', optionRoutes);
router.use('/classes', classRoutes);
router.use('/students', studentRoutes);
router.use('/staff', staffRoutes);
router.use('/cards', cardRoutes);
router.use('/users', userRoutes);

export default router;
