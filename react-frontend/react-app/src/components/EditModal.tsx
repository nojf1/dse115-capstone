import React from 'react';
import { Member, Service, Stylist, Appointment } from '../types';
import { GalleryImage } from '../types';

interface EditModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (data: Member | Service | Stylist | Appointment | GalleryImage) => void;
  item: Member | Service | Stylist | Appointment | GalleryImage | null;
  type: 'member' | 'service' | 'stylist' | 'appointment' | 'gallery';
  isCreating: boolean;
}

type FormDataType = {
  // Member fields
  member_id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  
  // Service fields
  service_id?: number;
  name?: string;
  price?: number;
  description?: string;
  
  // Stylist fields
  stylist_id?: number;
  expertise?: string;
  experience_years?: number;
  profile_picture?: string;
  
  // Appointment fields
  appointment_id?: number;
  appointment_date?: string;
  status?: 'Scheduled' | 'Completed' | 'Canceled';
  member?: { first_name: string; last_name: string };
  stylist?: { name: string };
  service?: { name: string; price: number };

  // Gallery fields
  id?: number;
  image_url?: string;
  caption?: string;
  uploaded_at?: Date;
};

const EditModal: React.FC<EditModalProps> = ({ show, onClose, onSave, item, type, isCreating }) => {
  const [formData, setFormData] = React.useState<FormDataType>(() => {
    if (isCreating && type === 'gallery') {
      return {
        image_url: '',
        caption: ''
      };
    }
    return item || {};
  });

  React.useEffect(() => {
    setFormData(item || {});
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch(type) {
      case 'member':
        onSave(formData as Member);
        break;
      case 'service':
        onSave(formData as Service);
        break;
      case 'stylist':
        onSave(formData as Stylist);
        break;
      case 'appointment':
        onSave(formData as Appointment);
        break;
      case 'gallery':
        onSave({
          id: formData.id,
          image_url: formData.image_url,
          caption: formData.caption
        } as GalleryImage);
        break;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderMemberForm = () => (
    <>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          name="first_name"
          value={formData.first_name || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          name="last_name"
          value={formData.last_name || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="tel"
          className="form-control"
          name="phone"
          value={formData.phone || ''}
          onChange={handleInputChange}
        />
      </div>
    </>
  );

  const renderServiceForm = () => (
    <>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price (RM)</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={formData.price || ''}
          onChange={handleInputChange}
          required
          step="0.01"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
        />
      </div>
    </>
  );

  const renderStylistForm = () => (
    <>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Expertise</label>
        <input
          type="text"
          className="form-control"
          name="expertise"
          value={formData.expertise || ''}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Experience (years)</label>
        <input
          type="number"
          className="form-control"
          name="experience_years"
          value={formData.experience_years || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Profile Picture URL</label>
        <input
          type="url"
          className="form-control"
          name="profile_picture"
          value={formData.profile_picture || ''}
          onChange={handleInputChange}
          placeholder="https://example.com/image.jpg"
        />
        {formData.profile_picture && (
          <div className="mt-2">
            <img
              src={formData.profile_picture}
              alt="Profile Preview"
              className="img-thumbnail"
              style={{ maxHeight: '100px' }}
            />
          </div>
        )}
      </div>
    </>
  );

  const renderAppointmentForm = () => (
    <>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="datetime-local"
          className="form-control"
          name="appointment_date"
          value={formData.appointment_date?.slice(0, 16) || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          name="status"
          value={formData.status || ''}
          onChange={handleInputChange}
          required
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
    </>
  );

  const renderGalleryForm = () => (
    <>
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="url"
          className="form-control"
          name="image_url"
          value={formData.image_url || ''}
          onChange={handleInputChange}
          required
          placeholder="https://example.com/image.jpg"
        />
        {formData.image_url && (
          <div className="mt-2">
            <img
              src={formData.image_url}
              alt="Preview"
              className="img-thumbnail"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Caption</label>
        <input
          type="text"
          className="form-control"
          name="caption"
          value={formData.caption || ''}
          onChange={handleInputChange}
          placeholder="Enter image caption"
        />
      </div>
    </>
  );

  const renderForm = () => {
    switch (type) {
      case 'member':
        return renderMemberForm();
      case 'service':
        return renderServiceForm();
      case 'stylist':
        return renderStylistForm();
      case 'appointment':
        return renderAppointmentForm();
      case 'gallery':
        return renderGalleryForm();
      default:
        return null;
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isCreating ? 'Create New' : 'Edit'} {type.charAt(0).toUpperCase() + type.slice(1)}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {renderForm()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isCreating ? 'Create' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;