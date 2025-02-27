import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useServiceData } from "../services/ServicesService";
import { useStylistData } from "../services/StylistService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { bookingService } from '../services/BookingService';

const Booking = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { services, loading: servicesLoading } = useServiceData();
  const { stylists, loading: stylistsLoading } = useStylistData();

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    stylist_id: "",
    service_id: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
  });

  // Load user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/booking" } });
      return;
    }

    try {
      // Combine date and time
      const appointmentDateTime = new Date(`${formData.appointment_date}T${formData.appointment_time}`);
      
      // Create appointment
      await bookingService.createAppointment({
        stylist_id: parseInt(formData.stylist_id),
        service_id: parseInt(formData.service_id),
        appointment_date: appointmentDateTime.toISOString(),
        notes: formData.notes
      });

      // Show success message
      alert("Appointment booked successfully!");
      
      // Clear form
      setFormData({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        stylist_id: "",
        service_id: "",
        appointment_date: "",
        appointment_time: "",
        notes: "",
      });

      // Redirect to profile or appointments page
      navigate("/profile");
    } catch (error: any) {
      console.error("Booking failed:", error);
      alert(error.response?.data?.message || "Failed to book appointment");
    }
  };

  if (servicesLoading || stylistsLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Book an Appointment</h1>
        <p className="lead text-muted">
          Schedule your next hair appointment with our expert stylists
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <h4 className="mb-4">Personal Information</h4>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name*</label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name*</label>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email*</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone*</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Appointment Details */}
                <h4 className="mb-4">Appointment Details</h4>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Stylist*</label>
                    <select
                      name="stylist_id"
                      className="form-select"
                      value={formData.stylist_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose a stylist</option>
                      {stylists.map(stylist => (
                        <option key={stylist.stylist_id} value={stylist.stylist_id}>
                          {stylist.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select Service*</label>
                    <select
                      name="service_id"
                      className="form-select"
                      value={formData.service_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose a service</option>
                      {services.map(service => (
                        <option key={service.service_id} value={service.service_id}>
                          {service.name} - RM {service.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date*</label>
                    <input
                      type="date"
                      name="appointment_date"
                      className="form-control"
                      value={formData.appointment_date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Time*</label>
                    <input
                      type="time"
                      name="appointment_time"
                      className="form-control"
                      value={formData.appointment_time}
                      onChange={handleInputChange}
                      min="10:00"
                      max="20:00"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Additional Notes</label>
                  <textarea
                    name="notes"
                    className="form-control"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requests or concerns?"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-dark w-100 py-2">
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;