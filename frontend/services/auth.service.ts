import { apiClient } from '../lib/api-client';
import { AuthResponse, User } from '../types';

export const authService = {
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    if (response.access_token) {
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    if (response.access_token) {
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  async getProfile(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
