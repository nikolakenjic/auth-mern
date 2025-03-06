import jwt from 'jsonwebtoken';
import VerificationCodeTypes from '../constants/verificationCodeTypes';
import SessionModel from '../models/session.model';
import UserModel from '../models/user.model';
import VerificationCodeModel from '../models/verificationCode.model';
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from '../utils/date';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import appAssert from '../utils/appAssert';
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from '../constants/http';
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from '../utils/jwt';

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

  const userId = user._id;

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeTypes.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // send verification email
  // to do send verification email

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  // sign access token and refresh token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );

  const accessToken = signToken({ userId: user._id, sessionId: session._id });

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
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({ ...sessionInfo, userId: user._id });

  // return user and tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, 'Invalid refresh token');

  const session = await SessionModel.findById(payload.sessionId);
  const now = Date.now();
  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    'Session expired'
  );

  // Refresh the session if the expires in the next 24 hours
  const sessionNeedsRefresh = session.expiresAt.getTime() - now < ONE_DAY_MS;

  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  // New refresh and access tokens
  const newRefreshToken = sessionNeedsRefresh
    ? signToken(
        {
          sessionId: session._id,
        },
        refreshTokenSignOptions
      )
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  // Return new tokens
  return {
    accessToken,
    newRefreshToken,
  };
};

export const verifyEmail = async (code: string) => {
  // get verification code
  const validCode = await VerificationCodeModel.findOne({
    _id: code,
    type: VerificationCodeTypes.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, NOT_FOUND, 'Invalid or expired verification code');

  // Update user to verified true
  const updateUser = await UserModel.findByIdAndUpdate(
    validCode.userId,
    { verified: true },
    { new: true }
  );
  appAssert(updateUser, INTERNAL_SERVER_ERROR, 'Failed to verify email');

  // Delete verification code
  await validCode.deleteOne();

  // return value
  return {
    user: updateUser.omitPassword(),
  };
};
