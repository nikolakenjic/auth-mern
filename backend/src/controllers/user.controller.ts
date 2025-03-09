import { NOT_FOUND, OK } from '../constants/http';
import UserModel from '../models/user.model';
import appAssert from '../utils/appAssert';
import catchAsync from '../utils/catchAsync';

export const getUserHandler = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, 'User not found');

  return res.status(OK).json(user.omitPassword());
});
