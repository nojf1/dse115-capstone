import { useState, useEffect } from 'react';
import api from './MemberService';

interface StylistData {
  name: string;
  expertise?: string;
  experience_years?: number;
  profile_picture?: File;
}

export const stylistService = {
  // Get all stylists
  getAllStylists: async () => {
    try {
      const response = await api.get('/stylists/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get stylist by ID
  getStylistById: async (id: number) => {
    try {
      const response = await api.get(`/stylists/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new stylist (admin only)
  createStylist: async (stylistData: StylistData) => {
    try {
      const formData = new FormData();
      formData.append('name', stylistData.name);
      if (stylistData.expertise) {
        formData.append('expertise', stylistData.expertise);
      }
      if (stylistData.experience_years) {
        formData.append('experience_years', stylistData.experience_years.toString());
      }
      if (stylistData.profile_picture) {
        formData.append('profile_picture', stylistData.profile_picture);
      }

      const response = await api.post('/stylists/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update stylist (admin only)
  updateStylist: async (id: number, stylistData: Partial<StylistData>) => {
    try {
      const formData = new FormData();
      if (stylistData.name) {
        formData.append('name', stylistData.name);
      }
      if (stylistData.expertise) {
        formData.append('expertise', stylistData.expertise);
      }
      if (stylistData.experience_years) {
        formData.append('experience_years', stylistData.experience_years.toString());
      }
      if (stylistData.profile_picture) {
        formData.append('profile_picture', stylistData.profile_picture);
      }

      const response = await api.put(`/stylists/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete stylist (admin only)
  deleteStylist: async (id: number) => {
    try {
      const response = await api.delete(`/stylists/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Custom hook for stylist data management
export const useStylistData = () => {
  const [stylists, setStylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStylists = async () => {
    try {
      setLoading(true);
      const response = await stylistService.getAllStylists();
      setStylists(response.stylists);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch stylists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStylists();
  }, []);

  return { stylists, loading, error, refetchStylists: fetchStylists };
};

export default stylistService;