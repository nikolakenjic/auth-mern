import { CookieOptions, Response } from 'express';
import { fifteenMinutesFromNow, thirtyDaysFromNow } from './date';

const secure = process.env.NODE_ENV !== 'development';
const REFRESH_PATH = '/auth/refresh';

const defaults: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure,
};

type CookieParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: fifteenMinutesFromNow(),
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
});

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: CookieParams) =>
  res
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res: Response) =>
  res.clearCookie('accessToken').clearCookie('refreshToken', {
    path: REFRESH_PATH,
  });
