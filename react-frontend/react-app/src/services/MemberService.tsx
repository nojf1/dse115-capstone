import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Member service functions
export const memberService = {
  // Login member
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/members/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.member));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new member
  register: async (memberData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  }) => {
    try {
      const response = await api.post('/members/register', memberData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get member profile
  getProfile: async () => {
    try {
      const response = await api.get('/members/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update member profile
  updateProfile: async (updateData: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  }) => {
    try {
      const response = await api.put('/members/update', updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete member account
  deleteAccount: async (memberId: number) => {
    try {
      const response = await api.delete(`/members/${memberId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout member
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  },

  // Check if user is admin
  isAdmin: () => {
    const user = memberService.getCurrentUser();
    return user?.isAdmin || false;
  }
};

export default api;