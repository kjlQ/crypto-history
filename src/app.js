import express from 'express';
import priceAnalytics from './analysis/priceAnalytics.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/api/analytics", priceAnalytics);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});