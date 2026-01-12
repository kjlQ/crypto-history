import { getKlines } from '../services/binanceService.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const klines = await getKlines(req.query.symbol, req.query.interval, req.query.startTime, req.query.endTime);
  res.json(klines);
});

export default router;