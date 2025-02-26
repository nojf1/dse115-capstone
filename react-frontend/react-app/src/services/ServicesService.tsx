import { useState, useEffect } from 'react';
import api from './MemberService';

interface ServiceData {
  service_id?: number;
  name: string;
  description?: string;
  price: number;
}

export const serviceService = {
  // Get all services
  getAllServices: async () => {
    try {
      const response = await api.get('/services/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get service by ID
  getServiceById: async (id: number) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new service (admin only)
  createService: async (serviceData: ServiceData) => {
    try {
      const response = await api.post('/services/create', serviceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update service (admin only)
  updateService: async (id: number, serviceData: Partial<ServiceData>) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete service (admin only)
  deleteService: async (id: number) => {
    try {
      const response = await api.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Custom hook for service data management
export const useServiceData = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceService.getAllServices();
      setServices(response.services);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { 
    services, 
    loading, 
    error, 
    refetchServices: fetchServices,
    createService: async (serviceData: ServiceData) => {
      try {
        await serviceService.createService(serviceData);
        fetchServices(); // Refresh the list after creation
      } catch (error) {
        throw error;
      }
    },
    updateService: async (id: number, serviceData: Partial<ServiceData>) => {
      try {
        await serviceService.updateService(id, serviceData);
        fetchServices(); // Refresh the list after update
      } catch (error) {
        throw error;
      }
    },
    deleteService: async (id: number) => {
      try {
        await serviceService.deleteService(id);
        fetchServices(); // Refresh the list after deletion
      } catch (error) {
        throw error;
      }
    }
  };
};

export default serviceService;