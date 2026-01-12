import binanceConfig from '../config/binance';
import axios from 'axios';

export const getKlines = async (symbol: string, interval: string, startTime: string, endTime: string) => {
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
