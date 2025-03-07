import { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";
import { memberService, api } from '../services/MemberService';
import { serviceService } from "../services/ServicesService";
import { stylistService } from "../services/StylistService";
import { bookingService } from "../services/BookingService";
import { galleryService } from "../services/GalleryService";
import { productService } from "../services/ProductService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import EditModal from '../components/EditModal';
import { Member, Service, Stylist, Appointment, GalleryImage, Product } from '../types';
import { CreateGalleryImage, UpdateGalleryImage } from '../services/GalleryService';

const Admin = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState<Member[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Member | Service | Stylist | Appointment | GalleryImage | Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const formatPrice = (price: number | string | undefined | null): string => {
    if (price === undefined || price === null) return '0.00';
    const numPrice = typeof price === 'string' ? Number(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  useEffect(() => {
    console.log('Auth status:', { isAuthenticated, isAdmin });
    if (!isAuthenticated || !isAdmin) {
      console.log('Redirecting: Not authenticated or not admin');
      navigate("/");
      return;
    }
    fetchData();
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    fetchData();
  }, [activeTab]); // Add activeTab as dependency

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      switch (activeTab) {
        case "members":
          const membersData = await memberService.getAllMembers();
          if (membersData && membersData.members) {
            setMembers(membersData.members);
          }
          break;
        case "services":
          const servicesData = await serviceService.getAllServices();
          setServices(servicesData.services);
          break;
        case "stylists":
          const stylistsData = await stylistService.getAllStylists();
          setStylists(stylistsData.stylists);
          break;
        case "appointments":
          const appointmentsData = await bookingService.getAllAppointments();
          setAppointments(appointmentsData.appointments.map((appointment: any) => ({
            ...appointment,
            status: appointment.status || "Scheduled",
            member: appointment.Member || appointment.member,
            stylist: appointment.Stylist || appointment.stylist,
            service: appointment.Service || appointment.service
          })));
          break;
        case "gallery":
          const galleryResponse = await galleryService.getAllImages();
          if (galleryResponse && galleryResponse.images) {
            setGallery(galleryResponse.images);
          } else {
            setGallery([]);
          }
          break;
        case "products":
          const productsData = await productService.getAllProducts();
          setProducts(productsData.products);
          break;
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error?.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: Member | Service | Stylist | Appointment | GalleryImage | Product) => {
    setIsCreating(false);
    setEditItem(item);
    setShowModal(true);
  };

  const handleSave = async (updatedData: any) => {
    try {
      switch (activeTab) {
        case "gallery":
          const galleryUpdateData = {
            id: updatedData.id,
            image_url: updatedData.image_url,
            caption: updatedData.caption || ''
          };
          await galleryService.updateImage(galleryUpdateData.id, galleryUpdateData);
          break;
        case "members":
          await memberService.updateProfile(updatedData);
          break;
        case "services":
          await serviceService.updateService(updatedData.service_id, updatedData);
          break;
        case "stylists":
          await stylistService.updateStylist(updatedData.stylist_id, updatedData);
          break;
        case "appointments":
          await bookingService.updateAppointment(updatedData.appointment_id, updatedData);
          break;
        case "products":
          await productService.updateProduct(updatedData.id, updatedData);
          break;
      }
      setShowModal(false);
      fetchData();
      setError(null);
    } catch (error: any) {
      setError(error?.message || "Failed to update item");
    }
  };

  const handleSaveCreate = async (newData: any) => {
    try {
      switch (activeTab) {
        case "members":
          await memberService.register(newData);
          break;
        case "services":
          await serviceService.createService(newData);
          break;
        case "stylists":
          await stylistService.createStylist(newData);
          break;
        case "appointments":
          await bookingService.createAppointment(newData);
          break;
        case "gallery":
          const galleryData: CreateGalleryImage = {
            image_url: newData.image_url,
            caption: newData.caption
          };
          await galleryService.createImage(galleryData);
          break;
        case "products":
          await productService.createProduct(newData);
          break;
      }
      setShowModal(false);
      fetchData();
      setError(null);
    } catch (error: any) {
      setError(error?.message || "Failed to create item in gallery.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      switch (activeTab) {
        case "members":
          await memberService.deleteAccount(id);
          break;
        case "services":
          await serviceService.deleteService(id);
          break;
        case "stylists":
          await stylistService.deleteStylist(id);
          break;
        case "appointments":
          await bookingService.deleteAppointment(id);
          break;
        case "gallery":
          await galleryService.deleteImage(id);
          break;
        case "products":
          await productService.deleteProduct(id);
          break;
      }
      fetchData();
    } catch (error: any) {
      setError(error?.message || "An error occurred");
    }
  };

  const renderTable = () => {
    switch (activeTab) {
      case "members":
        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.member_id}>
                  <td>{member.member_id}</td>
                  <td>{`${member.first_name} ${member.last_name}`}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(member)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(member.member_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "services":
        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.service_id}>
                  <td>{service.service_id}</td>
                  <td>{service.name}</td>
                  <td>RM {service.price.toFixed(2)}</td>
                  <td>{service.description}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(service)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(service.service_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "stylists":
        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Expertise</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stylists.map((stylist) => (
                <tr key={stylist.stylist_id}>
                  <td>{stylist.stylist_id}</td>
                  <td>
                    {stylist.profile_picture ? (
                      <img
                        src={stylist.profile_picture}
                        alt={stylist.name}
                        className="img-thumbnail"
                        style={{ maxHeight: '50px' }}
                      />
                    ) : (
                      <span className="text-muted">No image</span>
                    )}
                  </td>
                  <td>{stylist.name}</td>
                  <td>{stylist.expertise}</td>
                  <td>{stylist.experience_years} years</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(stylist)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(stylist.stylist_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "appointments":
        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Stylist</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointment_id}>
                  <td>{appointment.appointment_id}</td>
                  <td>
                    {appointment.member ? 
                      `${appointment.member.first_name} ${appointment.member.last_name}` : 
                      'Unknown Client'}
                  </td>
                  <td>{appointment.stylist?.name || 'Unknown Stylist'}</td>
                  <td>
                    {appointment.service ? 
                      `${appointment.service.name} (RM${formatPrice(appointment.service.price)})` : 
                      'Unknown Service'}
                  </td>
                  <td>
                    {new Date(appointment.appointment_date).toLocaleString('en-MY', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </td>
                  <td>
                    <span className={`badge bg-${
                      appointment.status === 'Completed' ? 'success' :
                      appointment.status === 'Canceled' ? 'danger' : 'primary'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(appointment)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(appointment.appointment_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "gallery":
        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Caption</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {gallery.map((image) => (
                <tr key={image.id}>
                  <td>{image.id}</td>
                  <td>
                    {image.image_url ? (
                      <img
                        src={image.image_url}
                        alt={image.caption || 'Gallery image'}
                        className="img-thumbnail"
                        style={{ maxHeight: '50px' }}
                      />
                    ) : (
                      <span className="text-muted">No image</span>
                    )}
                  </td>
                  <td>{image.caption || '-'}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(image)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(image.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "products":
        return (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="img-thumbnail"
                        style={{ maxHeight: '50px' }}
                      />
                    ) : (
                      <span className="text-muted">No image</span>
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>RM{formatPrice(product.price)}</td>
                  <td>{product.stock_quantity}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
  };

  return (
    <div className="container-fluid py-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "members" ? "active" : ""}`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "services" ? "active" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "stylists" ? "active" : ""}`}
            onClick={() => setActiveTab("stylists")}
          >
            Stylists
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "gallery" ? "active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            Gallery
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
        </li>
      </ul>

      {/* Action Buttons */}
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleCreate}>
          Create New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, )}
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        /* Data Table */
        <div className="table-responsive">{renderTable()}</div>
      )}

      {/* Edit Modal */}
      <EditModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setIsCreating(false);
        }}
        onSave={isCreating ? handleSaveCreate : handleSave}
        item={editItem}
        // Don't slice the gallery type
        type={activeTab === 'gallery' ? 'gallery' : activeTab.slice(0, -1) as 'member' | 'service' | 'stylist' | 'appointment' | 'gallery' | 'product'}
        isCreating={isCreating}
      />
    </div>
  );
};

export default Admin;