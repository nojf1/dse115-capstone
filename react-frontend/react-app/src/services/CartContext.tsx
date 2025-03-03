import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from './api'; // Make sure this matches your export

// Define cart item interface
interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: {
    id: number;
    name: string;
    price: number;
    image_url?: string;
  };
}

// Define cart interface
interface Cart {
  id: number;
  member_id: number;
  total: number;
  items: CartItem[];
}

interface CartContextType {
  cart: Cart;
  loading: boolean;
  error: string | null;
  addToCart: (productId: number, quantity?: number) => Promise<any>;
  updateCartItem: (itemId: number, quantity: number) => Promise<any>;
  removeFromCart: (itemId: number) => Promise<any>;
  clearCart: () => Promise<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart with a safe default structure
  const [cart, setCart] = useState<Cart>({
    id: 0,
    member_id: 0,
    total: 0,
    items: [] // Always provide an empty array
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Add a refresh state
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Reset cart for non-authenticated users
      setCart({
        id: 0,
        member_id: 0,
        total: 0,
        items: []
      });
    }
  }, [isAuthenticated]);

  // Add effect to refetch cart when refresh changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, refresh]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/cart');
      console.log('Cart data received:', response.data);
      
      // Handle different response formats
      if (response.data && response.data.cart) {
        setCart({
          ...response.data.cart,
          items: response.data.items || []
        });
      } else if (response.data) {
        setCart({
          ...response.data,
          items: response.data.items || []
        });
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    
    try {
      await api.post('/cart/add', { product_id: productId, quantity });
      setRefresh(prev => !prev); // Toggle refresh to trigger refetch
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    if (!isAuthenticated || !cart) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await api.delete(`/cart/item/${itemId}`);
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove product from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: number, quantity: number) => {
    if (!isAuthenticated || !cart) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // First, update the item
      await api.put(`/cart/item/${itemId}`, { quantity });
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError('Failed to update cart item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated || !cart) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await api.delete('/cart');
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      error, 
      addToCart, 
      updateCartItem, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};