import { useState, useEffect } from 'react';
import { api } from './MemberService'; // Update this import

interface AppointmentData {
  appointment_id: number;
  member_id: number;
  stylist_id: number;
  service_id: number;
  appointment_date: string;
  status: 'Scheduled' | 'Completed' | 'Canceled';
  description?: string;
  member?: {
    first_name: string;
    last_name: string;
  } | null;
  stylist?: {
    name: string;
  } | null;
  service?: {
    name: string;
    price: number;
  } | null;
}


export const bookingService = {
  // Get all appointments (admin only)
  getAllAppointments: async (): Promise<{ appointments: AppointmentData[] }> => {
    try {
      const response = await api.get('/appointments/all', {
        params: {
          include: ['member', 'stylist', 'service']
        }
      });
      
      return {
        appointments: response.data.appointments.map((appointment: any) => ({
          ...appointment,
          member: appointment.Member || appointment.member,
          stylist: appointment.Stylist || appointment.stylist,
          service: appointment.Service || appointment.service ? {
            ...appointment.Service || appointment.service,
            price: Number(appointment.Service?.price || appointment.service?.price || 0)
          } : null
        }))
      };
    } catch (error) {
      throw error;
    }
  },

  // Get member's appointments
  getMyAppointments: async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      const appointments = response.data.appointments.map((appointment: any) => ({
        ...appointment,
        stylist: appointment.Stylist || appointment.stylist,
        service: appointment.Service || appointment.service,
        status: appointment.status || 'Scheduled'
      }));
      return { appointments };
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