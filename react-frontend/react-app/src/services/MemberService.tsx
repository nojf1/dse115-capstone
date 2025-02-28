import axios from 'axios';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
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

export interface Member {
  member_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_admin?: boolean;
  created_at?: Date;
}

interface MemberResponse {
  message: string;
  members: Member[];
}

// Member service functions
export const memberService = {
  // Login member
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/members/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.member));
        // Set authorization header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Failed to login');
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
      if (response.data.member) {
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(response.data.member));
      }
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
      // Update local storage with new user data
      if (response.data.member) {
        const updatedUser = response.data.member;
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return response.data;
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.response?.data?.message || 'Failed to update profile');
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

  // Get all members (admin only)
  getAllMembers: async (): Promise<MemberResponse> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.get('/members/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.data || !response.data.members) {
        throw new Error('Invalid response format');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error fetching members:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch members');
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
  },
  
  async forgotPassword(email: string) {
    try {
      const response = await api.post('/members/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to send reset email');
    }
  },
  
  resetPassword: async (token: string, password: string) => {
    try {
      const response = await api.post(`/members/reset-password/${token}`, { password });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to reset password');
    }
  }
};

export default memberService;
