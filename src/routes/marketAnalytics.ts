import { Router } from 'express';
import { analyticsHandler } from '../services/analyticsService';

const router = Router();

router.get('/', analyticsHandler);

export default router;