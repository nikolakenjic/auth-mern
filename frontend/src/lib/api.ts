import API from '@/config/apiClient';

interface AuthParams {
  email: string;
  password: string;
}

export const login = async (data: AuthParams) => API.post('/auth/login', data);
