import { getKlines } from '../services/binanceService.js';
import { Router } from 'express';
import { analyzeKlines } from '../analysis/priceAnalytics.js';

const router = Router();

router.get('/', async (req, res) => {
    const { symbol, interval, startTime, endTime } = req.query;
    const klines = await getKlines(symbol, interval, startTime, endTime);
    const analytics = analyzeKlines(klines);
    res.json(analytics);
});

export default router;