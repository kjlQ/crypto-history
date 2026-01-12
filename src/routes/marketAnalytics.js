import { getKlines } from '../services/binanceService.js';
import { Router } from 'express';
import { analyzeKlines } from '../analysis/priceAnalytics.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { symbol, interval, startTime, endTime } = req.query;

        if(!symbol || !interval || !startTime || !endTime) {
            const error = new Error('Missing required parameters');
            error.status = 400;
            throw error;
        }

        if(isNaN(startTime) || isNaN(endTime)) {
            const error = new Error('Invalid time parameters');
            error.status = 400;
            throw error;
        }

        const klines = await getKlines(symbol, interval, startTime, endTime);
        const analytics = analyzeKlines(klines);
        
        res.json({
            success: true,
            data: {
                openPrices: analytics.openPrices,
                closePrices: analytics.closePrices,
                priceChange: analytics.change,
                priceChangePercentage: analytics.changePercentage,
                dateOpen: new Date(klines[0][0]).toISOString(),
                dateClose: new Date(klines[klines.length - 1][0]).toISOString(),
            },
            meta: {
                symbol,
                interval,
                klines: klines.length,
            }
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;