import express from 'express';
import binanceService from './services/binance.service.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/api/binance", binanceService);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});