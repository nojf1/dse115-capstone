import { useState, useEffect } from 'react';
import api from './MemberService';

interface AppointmentData {
  appointment_id?: number;
  member_id?: number;
  stylist_id: number;
  service_id: number;
  appointment_date: string;
  status?: 'Scheduled' | 'Completed' | 'Canceled';
  notes?: string;
  stylist?: {
    name: string;
  };
  service?: {
    name: string;
    price: number;
  };
}

export const bookingService = {
  // Get all appointments (admin only)
  getAllAppointments: async () => {
    try {
      const response = await api.get('/appointments/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get member's appointments
  getMyAppointments: async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new appointment
  createAppointment: async (appointmentData: {
    stylist_id: number;
    service_id: number;
    appointment_date: string;
    notes?: string;
  }) => {
    try {
      const response = await api.post('/appointments/create', appointmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update appointment
  updateAppointment: async (
    id: number,
    appointmentData: Partial<AppointmentData>
  ) => {
    try {
      const response = await api.put(`/appointments/${id}`, appointmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel appointment
  deleteAppointment: async (id: number) => {
    try {
      const response = await api.delete(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Custom hook for appointment management
export const useAppointmentData = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getMyAppointments();
      setAppointments(response.appointments);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    error,
    refetchAppointments: fetchAppointments,
    createAppointment: async (appointmentData: {
      stylist_id: number;
      service_id: number;
      appointment_date: string;
      notes?: string;
    }) => {
      try {
        await bookingService.createAppointment(appointmentData);
        await fetchAppointments();
      } catch (error) {
        throw error;
      }
    },
    updateAppointment: async (id: number, appointmentData: Partial<AppointmentData>) => {
      try {
        await bookingService.updateAppointment(id, appointmentData);
        await fetchAppointments();
      } catch (error) {
        throw error;
      }
    },
    deleteAppointment: async (id: number) => {
      try {
        await bookingService.deleteAppointment(id);
        await fetchAppointments();
      } catch (error) {
        throw error;
      }
    },
  };
};

export default bookingService;