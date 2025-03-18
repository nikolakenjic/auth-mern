import API from '@/config/apiClient';

export interface loginParams {
  email: string;
  password: string;
}

export interface registerParams extends loginParams {
  confirmPassword: string;
}

export const login = async (data: loginParams) => API.post('/auth/login', data);
export const register = async (data: registerParams) =>
  API.post('/auth/register', data);
