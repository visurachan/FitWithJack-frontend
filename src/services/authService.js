import api from './api';

export const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  // Verify email with code
  verify: async (email, code) => {
    const response = await api.post(`/api/auth/verify?email=${encodeURIComponent(email)}`, { code });
    return response.data;
  },

  // Set password after email verification
  setPassword: async (email, password) => {
    const response = await api.post(`/api/auth/set-password?email=${encodeURIComponent(email)}`, { password });
    return response.data;
  },

  // Login with email and password
  login: async (email, password) => {
    const response = await api.post(`/api/auth/login?email=${encodeURIComponent(email)}`, { password });
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
