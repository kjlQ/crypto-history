import express from 'express';
import marketAnalytics from './routes/marketAnalytics.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/api/analytics", marketAnalytics);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});