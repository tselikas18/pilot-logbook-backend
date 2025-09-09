import { Router } from 'express';
import authRoutes from './authRoutes';

const router = Router();

// Register all route modules here
router.use('/auth', authRoutes);

export default router;
