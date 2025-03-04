import { z } from 'zod';
import catchErrors from '../utils/catchErrors';
import { createAccount } from '../services/auth.service';
import { CREATED } from '../constants/http';
import { setAuthCookies } from '../utils/cookies';

const registerSchema = z
  .object({
    email: z.string().email().min(1).max(100),
    password: z.string().min(6).max(30),
    confirmPassword: z.string().min(6).max(30),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const registerHandler = catchErrors(async (req, res, next) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });
  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});
