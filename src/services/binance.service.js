import binanceConfig from '../config/binance.js';
import {Router} from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res) => {
  const response = await axios.get(`${binanceConfig.baseURL}/ticker/price?symbol=${req.query.symbol}`);
  res.json(response.data);
});

export default router;

