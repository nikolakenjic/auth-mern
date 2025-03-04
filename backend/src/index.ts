import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDatabase from './config/db';
import { APP_ORIGIN, PORT } from './constants/env';
import errorHandler from './middleware/errorHandler';
import catchAsync from './utils/catchAsync';

// Routes
import authRoutes from './routes/auth.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get(
  '/',
  catchAsync(async (req, res, next) => {
    // throw new Error('This is an error');
    res.send('Node auth');
  })
);

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(` Server running at http://localhost:${PORT}`);
  await connectToDatabase();
});
