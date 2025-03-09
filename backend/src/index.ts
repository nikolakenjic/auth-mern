import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDatabase from './config/db';
import { APP_ORIGIN, PORT } from './constants/env';
import errorHandler from './middleware/errorHandler';
import catchAsync from './utils/catchAsync';
import authenticate from './middleware/authenticate';

// Routes
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';

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

// protected routes
app.use('/user', authenticate, userRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(` Server running at http://localhost:${PORT}`);
  await connectToDatabase();
});
