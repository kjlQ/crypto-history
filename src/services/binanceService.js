import binanceConfig from '../config/binance.js';
import axios from 'axios';

export const getKlines = async (symbol, interval, startTime, endTime) => {
  const response = await axios.get(`${binanceConfig.baseURL}/klines`, {
    params: {
      symbol,
      interval,
      startTime,
      endTime,
    },
  });
  return response.data;
};
