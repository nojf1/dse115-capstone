import { useState, useEffect } from 'react';
import axios from 'axios';
// import { GalleryImage } from '../types';

const API_URL = 'http://localhost:5000/api/gallery';

export interface GalleryImage {
  id: number;
  image_url: string;
  caption?: string;
  uploaded_at: string; // Change to string since it comes from API
}

export interface CreateGalleryImage {
  image_url: string;
  caption?: string;
}

export interface UpdateGalleryImage {
  image_url?: string;
  caption?: string;
}

// Add auth header configuration
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

export const galleryService = {
  getAllImages: async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return {
        images: response.data.images || [],
        message: response.data.message
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch images');
    }
  },

  createImage: async (imageData: CreateGalleryImage) => {
    try {
      const response = await axios.post(`${API_URL}/create`, imageData, getAuthHeader());
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create image');
    }
  },

  updateImage: async (id: number, imageData: UpdateGalleryImage) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, imageData, getAuthHeader());
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update image');
    }
  },

  deleteImage: async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete image');
    }
  }
};

export const useGalleryData = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await galleryService.getAllImages();
      setImages(response.images);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, error, refetchImages: fetchImages };
};

export default galleryService;