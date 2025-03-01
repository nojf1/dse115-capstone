import React, { useState, useEffect } from 'react';
import { useCart } from '../services/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    postalCode: user?.postal_code || '',
    country: user?.country || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if cart is empty
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate a successful order because theres no time to actually implement Stripe + a real payment gateway is out of scope for a uni project
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart and redirect to home with success message
      await clearCart();
      navigate('/', { state: { success: true, message: 'Order placed successfully!' } });
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to process your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !cart.items) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const subtotal = cart.total || 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout</h1>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Shipping Information</h5>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                {/* Form fields here */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="firstName" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lastName" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                {/* More form fields */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-dark w-100 mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing Order...
                    </>
                  ) : (
                    `Complete Order ${Number(cart.total || 0).toFixed(2)}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${Number(cart.total || 0).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <strong>${Number(cart.total || 0).toFixed(2)}</strong>
              </div>
            </div>
          </div>
          
          <div className="card shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Items</h5>
            </div>
            <div className="card-body">
              {cart.items.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>
                    {item.product?.name || 'Product'} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;