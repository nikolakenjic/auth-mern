import { OK } from '../constants/http';
import SessionModel from '../models/session.model';
import catchAsync from '../utils/catchAsync';

export const getSessionsHandler = catchAsync(async (req, res, next) => {
  const sessions = await SessionModel.find(
    { userId: req.userId, expiresAt: { $gt: new Date() } },
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
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionId && { current: true }),
    }))
  );
});
