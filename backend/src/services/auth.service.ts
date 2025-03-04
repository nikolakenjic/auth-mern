import jwt from 'jsonwebtoken';
import VerificationCodeTypes from '../constants/verificationCodeTypes';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.mode;';
import { oneYearFromNow } from '../utils/date';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import appAssert from '../utils/appAssert';
import { CONFLICT, UNAUTHORIZED } from '../constants/http';

type AuthParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: AuthParams) => {
  // Verify existing user doesn't exist
  const existingUser = await UserModel.exists({ email: data.email });

  appAssert(!existingUser, CONFLICT, 'Email already exists');

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
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const loginUser = async ({ email, password, userAgent }: AuthParams) => {
  // get the user by email
  const user = await UserModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, 'Invalid email or password');

  // validate password from the request
  const isValidPassword = await user.comparePassword(password);
  appAssert(isValidPassword, UNAUTHORIZED, 'Invalid email or password');

  const userId = user._id;
  // create session
  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  // sign access token and refresh token
  const refreshToken = jwt.sign(sessionInfo, JWT_REFRESH_SECRET, {
    audience: ['user'],
    expiresIn: '30d',
  });

  const accessToken = jwt.sign(
    { ...sessionInfo, userId: user._id },
    JWT_SECRET,
    {
      audience: ['user'],
      expiresIn: '15m',
    }
  );

  // return user and tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
