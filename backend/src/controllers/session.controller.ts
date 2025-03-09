import { z } from 'zod';
import { NOT_FOUND, OK } from '../constants/http';
import SessionModel from '../models/session.model';
import catchAsync from '../utils/catchAsync';
import appAssert from '../utils/appAssert';

export const getSessionsHandler = catchAsync(async (req, res, next) => {
  const sessions = await SessionModel.find(
    {
      userId: req.userId,
      expiresAt: { $gt: Date.now() },
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res.status(OK).json(
    // mark the current session
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionId && {
        isCurrent: true,
      }),
    }))
  );
});

export const deleteSessionHandler = catchAsync(async (req, res, next) => {
  const sessionId = z.string().parse(req.params.id);

  const deleted = await SessionModel.findOneAndDelete({
    _id: sessionId,
    userId: req.userId,
  });
  appAssert(deleted, NOT_FOUND, 'Session not found');

  return res.status(OK).json({ message: 'Session removed' });
});
