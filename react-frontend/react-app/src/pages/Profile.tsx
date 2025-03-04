import { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import { memberService } from '../services/MemberService';
import { bookingService } from '../services/BookingService';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Profile = () => {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });
  
  // Add these new states for appointments
  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentError, setAppointmentError] = useState<string | null>(null);

  const loadUserData = async () => {
    try {
      const response = await memberService.getProfile();
      if (response.member) {
        setFormData({
          first_name: response.member.first_name || "",
          last_name: response.member.last_name || "",
          email: response.member.email || "",
          phone: response.member.phone || "",
          address: response.member.address || "",
          city: response.member.city || "",
          state: response.member.state || "",
          postal_code: response.member.postal_code || "",
          country: response.member.country || "",
        });
      }
    } catch (err) {
      setError("Failed to fetch profile data");
    }
  };

  // Add this new function to fetch appointments
  const fetchAppointments = async () => {
    if (!isAuthenticated) return;
    
    setAppointmentsLoading(true);
    setAppointmentError(null);
    
    try {
      const response = await bookingService.getMyAppointments();
      // Sort by date (most recent first) and limit to 5
      const sortedAppointments = response.appointments
        .sort((a: any, b: any) => new Date(b.appointment_date).getTime() - new Date(a.appointment_date).getTime())
        .slice(0, 5);
      
      setAppointments(sortedAppointments);
    } catch (err: any) {
      setAppointmentError(err.message || "Failed to load appointments");
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // Add this function to handle appointment cancellation
  const handleCancelAppointment = async (appointmentId: number) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    
    try {
      // Using updateAppointment instead of deleteAppointment to change status
      await bookingService.updateAppointment(appointmentId, { status: 'Canceled' });
      setSuccess("Appointment cancelled successfully");
      // Refresh appointment list
      fetchAppointments();
    } catch (err: any) {
      setError(err.message || "Failed to cancel appointment");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
      fetchAppointments();
    }
  }, [isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await memberService.updateProfile(formData);
      
      // Refresh user data in the auth context
      await refreshUser();
      
      // Refresh form data
      await loadUserData();
      
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      setSuccess(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-5 text-center">
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success text-center" role="alert">
          {success}
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="mb-4">
                <h1 className="display-4 fw-bold mb-3">My Profile</h1>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel Edit" : "Edit Profile"}
                </button>
              </div>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.email}
                          disabled
                        />
                        <small className="text-muted">
                          Email cannot be changed
                        </small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Postal Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="postal_code"
                          value={formData.postal_code}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-dark w-100">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5>Name</h5>
                      <p>{user?.first_name} {user?.last_name}</p>
                    </div>
                    <div className="col-md-6">
                      <h5>Email</h5>
                      <p>{user?.email}</p>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5>Phone</h5>
                      <p>{user?.phone || "Not provided"}</p>
                    </div>
                    <div className="col-md-6">
                      <h5>Address</h5>
                      <p>{user?.address || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5>City</h5>
                      <p>{user?.city || "Not provided"}</p>
                    </div>
                    <div className="col-md-6">
                      <h5>State</h5>
                      <p>{user?.state || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <h5>Postal Code</h5>
                      <p>{user?.postal_code || "Not provided"}</p>
                    </div>
                    <div className="col-md-6">
                      <h5>Country</h5>
                      <p>{user?.country || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add this new section for appointments */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="mb-4">
                <h2 className="fw-bold">My Recent Appointments</h2>
              </div>
              
              {appointmentError && (
                <div className="alert alert-danger" role="alert">
                  {appointmentError}
                </div>
              )}
              
              {appointmentsLoading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : appointments.length === 0 ? (
                <div className="alert alert-info">
                  You don't have any appointments yet.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Service</th>
                        <th>Stylist</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map(appointment => (
                        <tr key={appointment.appointment_id}>
                          <td>
                            {new Date(appointment.appointment_date).toLocaleString('en-US', {
                              dateStyle: 'medium',
                              timeStyle: 'short'
                            })}
                          </td>
                          <td>
                            {appointment.service?.name || 
                              (appointment.Service && appointment.Service.name) || 
                              'Loading...'}
                          </td>
                          <td>
                            {appointment.stylist?.name || 
                              (appointment.Stylist && appointment.Stylist.name) || 
                              'Loading...'}
                          </td>
                          <td>
                            <span className={`badge ${
                              appointment.status === 'Scheduled' ? 'bg-primary' :
                              appointment.status === 'Completed' ? 'bg-success' :
                              'bg-danger'
                            }`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td>
                            {appointment.status === 'Scheduled' && (
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleCancelAppointment(appointment.appointment_id)}
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
