import { getKlines } from '../services/binanceService';
import { Router } from 'express';
import { analyzeKlines } from '../analysis/priceAnalytics';
import { Analytics } from '../types/analytics.types';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { symbol, interval, startTime, endTime } = req.query as { symbol: string, interval: string, startTime: string, endTime: string };

        if(!symbol || !interval || !startTime || !endTime) {
            const error = new Error('Missing required parameters') as Error & {status: number};
            error.status = 400;
            throw error;
        }

        if(isNaN(Number(startTime)) || isNaN(Number(endTime))) {
            const error = new Error('Invalid time parameters') as Error & {status: number};
            error.status = 400;
            throw error;
        }

        const klines = await getKlines(symbol, interval, startTime, endTime);
        const analytics = analyzeKlines(klines) as Analytics;
        
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
    } catch (error: any) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;