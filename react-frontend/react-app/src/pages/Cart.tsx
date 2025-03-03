import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../services/CartContext';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Add effect to fetch cart data when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      const fetchCart = async () => {
        try {
          await api.get('/cart');
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };
      fetchCart();
    }
  }, [isAuthenticated]);
  
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="container py-5">
        <div className="card shadow">
          <div className="card-body text-center p-5">
            <h2 className="mb-4">Please Log In</h2>
            <p>You need to be logged in to view your cart.</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Ensure cart.items is always an array before checking length
  const cartItems = cart?.items || [];
  
  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="card shadow">
          <div className="card-body text-center p-5">
            <h2 className="mb-4">Your Cart is Empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products" className="btn btn-dark">Browse Products</Link>
          </div>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartItem(itemId, newQuantity);
    }
  };
  
  const handleRemoveItem = (itemId: number) => {
    removeFromCart(itemId);
  };
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header bg-white">
              <div className="row">
                <div className="col-6">Product</div>
                <div className="col-2 text-center">Price</div>
                <div className="col-2 text-center">Quantity</div>
                <div className="col-2 text-center">Total</div>
              </div>
            </div>
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item.id} className="row py-3 border-bottom">
                  <div className="col-6">
                    <div className="d-flex">
                      {item.product?.image_url && (
                        <img 
                          src={item.product.image_url} 
                          alt={item.product.name} 
                          className="img-fluid me-3 rounded" 
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                        />
                      )}
                      <div>
                        <h5 className="mb-1">{item.product?.name || 'Product'}</h5>
                        <button 
                          className="btn btn-link text-danger p-0" 
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 text-center">
                    RM{parseFloat(item.price.toString()).toFixed(2)}
                  </div>
                  <div className="col-2 text-center">
                    <div className="input-group input-group-sm">
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        className="form-control text-center" 
                        value={item.quantity} 
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-2 text-center">
                    RM{(parseFloat(item.price.toString()) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="d-flex justify-content-between">
            <Link to="/products" className="btn btn-outline-dark">
              Continue Shopping
            </Link>
            <button 
              className="btn btn-outline-danger"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <div className="total">Total: ${Number(cart.total).toFixed(2)}</div>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>${Number(cart.total || 0).toFixed(2)}</strong>
              </div>
              <button 
                className="btn btn-dark w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;