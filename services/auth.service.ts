import { apiRequest } from '../api/client';
import { API_ENDPOINTS } from '../api/config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiRequest(API_ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    localStorage.setItem('token', response.token);
    return response;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiRequest(API_ENDPOINTS.auth.register, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    localStorage.setItem('token', response.token);
    return response;
  },

  async logout(): Promise<void> {
    await apiRequest(API_ENDPOINTS.auth.logout, {
      method: 'POST',
    });
    localStorage.removeItem('token');
  },
};