import 'dotenv/config';
import express from 'express';
import { PORT } from './constants/env';
import connectToDatabase from './config/db';

const app = express();

app.get('/', (req, res) => {
  res.send('Node auth');
});

app.listen(PORT, async () => {
  console.log(` Server running at http://localhost:${PORT}`);
  await connectToDatabase();
});
