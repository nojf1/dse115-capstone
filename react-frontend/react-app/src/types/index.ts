export interface Member {
  member_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  is_admin?: boolean;
}

export interface Service {
  service_id: number;
  name: string;
  price: number;
  description?: string;
}

export interface Stylist {
  stylist_id: number;
  name: string;
  expertise?: string;
  experience_years: number;
  profile_picture?: string; // Add this field
}

export interface Appointment {
  appointment_id: number;
  member?: {
    first_name: string;
    last_name: string;
  };
  stylist?: {
    name: string;
  };
  service?: {
    name: string;
    price: number;
  };
  appointment_date: string;
  status: 'Scheduled' | 'Completed' | 'Canceled';
  notes?: string;
}

export interface GalleryImage {
    id: number;
    image_url: string;
    caption: string;
  }
  

export type FormDataType = Member | Service | Stylist | Appointment | GalleryImage;