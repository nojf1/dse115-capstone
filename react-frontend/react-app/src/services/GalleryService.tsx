import { useState, useEffect } from 'react';
import api from './MemberService';

export interface GalleryImage {
  id: number;
  image_url: string;
  caption?: string;
  uploaded_at: Date;
}

export interface CreateGalleryImage {
  image_url: string;
  caption?: string;
}

export interface UpdateGalleryImage {
  image_url?: string;
  caption?: string;
}

export const galleryService = {
  getAllImages: async () => {
    try {
      const response = await api.get('/gallery/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createImage: async (imageData: { image_url: string; caption?: string }) => {
    try {
      const response = await api.post('/gallery/create', imageData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateImage: async (id: number, imageData: { image_url?: string; caption?: string }) => {
    try {
      const response = await api.put(`/gallery/${id}`, imageData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteImage: async (id: number) => {
    try {
      const response = await api.delete(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      throw error;
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