import { apiClient } from './client';
import { LoginResponse, User } from '../types/user';

export interface LoginPayload {
  email: string;
  password?: string;
}

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    // For production server integration:
    // const response = await apiClient.post<LoginResponse>('/auth/login', payload);
    // return response.data;

    // Simulated robust response for initial setup
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: 'usr_101',
          email: payload.email,
          name: payload.email.split('@')[0],
          role: 'Farmer',
        };
        const token = 'mock_jwt_token_' + Date.now();
        resolve({ user, token });
      }, 1000);
    });
  },

  async logout(): Promise<void> {
    // For production server integration:
    // await apiClient.post('/auth/logout');
    return Promise.resolve();
  },
};
