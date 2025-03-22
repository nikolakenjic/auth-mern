import API from '@/config/apiClient';

export interface loginParams {
  email: string;
  password: string;
}

export interface registerParams extends loginParams {
  confirmPassword: string;
}

export interface resetPasswordParams {
  password: string;
  verificationCode: string;
}

export const login = async (data: loginParams) => API.post('/auth/login', data);
export const logout = async () => API.get('/auth/logout');
export const register = async (data: registerParams) =>
  API.post('/auth/register', data);
export const verifyEmail = async (code: string) =>
  API.get(`/auth/email/verify/${code}`);
export const sendPasswordResetEmail = async (email: string) =>
  API.post('/auth/password/forgot', { email });
export const resetPassword = async ({
  verificationCode,
  password,
}: resetPasswordParams) =>
  API.post('/auth/password/reset', { verificationCode, password });

export const getUser = async () => API.get('/user');
export const getSessions = async () => API.get('/sessions');
export const deleteSession = async (sessionId: string) =>
  API.delete(`/sessions/${sessionId}`);
