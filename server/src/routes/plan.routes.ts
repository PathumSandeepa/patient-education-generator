import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { generatePlaneController } from '../controllers/plan.controller';

const router = Router();
router.post('/generate', protect, generatePlaneController);

export default router;