import { Router } from 'express';

const router = Router();

// Auth routes will be added here
router.post('/login', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/register', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;
