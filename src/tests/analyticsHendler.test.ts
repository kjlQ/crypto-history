import { jest } from '@jest/globals';
import { analyzeKlines } from '../analysis/priceAnalytics';
import { analyticsHandler } from '../services/analyticsService';
import { getKlines } from '../services/binanceService';

jest.mock('../services/binanceService');
jest.mock('../analysis/priceAnalytics');

const mockedGetKlines = getKlines as jest.MockedFunction<typeof getKlines>;
const mockedAnalyzeKlines = analyzeKlines as jest.MockedFunction<typeof analyzeKlines>;

describe('Analytics Handler', () => {
    let mockReq: any;
    let mockRes: any;
    beforeEach(() => {
        mockReq = {
            query: {
                symbol: 'BTCUSDT',
                interval: '1m',
                startTime: '1670000000000',
                endTime: '1670000060000',
            },
        };
        mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should return when parameters are valid', async () => {
        mockedGetKlines.mockResolvedValue([[1670000000000, 100, 100, 100, 100]]);
        mockedAnalyzeKlines.mockReturnValue({
            openPrices: 100,
            closePrices: 100,
            change: 0,
            changePercentage: 0,
        });
    });

    it('should return 400 if missing required parameters', async () => {
        mockReq.query = {
            symbol: undefined,
            interval: undefined,
            startTime: undefined,
            endTime: undefined,
        };
    });

    it('should return 400 if invalid time parameters', async () => {
        mockReq.query = {
            symbol: 'BTCUSDT',
            interval: '1m',
            startTime: 'not a number',
            endTime: '1670000060000',
        };
    });

    it('should return 500 if klines fetch fails', async () => {
        mockedGetKlines.mockRejectedValue(new Error('Api failed'));

        await analyticsHandler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Api failed',
            data: null,
            meta: null,
        });
    });
});

