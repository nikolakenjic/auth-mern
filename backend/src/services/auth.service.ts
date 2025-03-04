import jwt from 'jsonwebtoken';
import VerificationCodeTypes from '../constants/verificationCodeTypes';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.mode;';
import { oneYearFromNow } from '../utils/date';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import appAssert from '../utils/appAssert';
import { CONFLICT } from '../constants/http';

type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // Verify existing user doesn't exist
  const existingUser = await UserModel.exists({ email: data.email });

  appAssert(!existingUser, CONFLICT, 'User already exists');

  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeTypes.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email
  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // sign access token and refresh token
  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    { audience: ['user'], expiresIn: '30d' }
  );

  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    JWT_SECRET,
    { audience: ['user'], expiresIn: '15m' }
  );

  // return user and tokens
  return {
    user,
    accessToken,
    refreshToken,
  };
};
