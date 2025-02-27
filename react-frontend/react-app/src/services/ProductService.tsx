import { useState, useEffect } from 'react';
import { memberService, api } from '../services/MemberService';

interface ProductData {
  product_id?: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock_quantity: number;
  image_url?: string;
}

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/products/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id: number) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new product (admin only)
  createProduct: async (productData: ProductData) => {
    try {
      const response = await api.post('/products/create', productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update product (admin only)
  updateProduct: async (id: number, productData: Partial<ProductData>) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete product (admin only)
  deleteProduct: async (id: number) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Custom hook for product data management
export const useProductData = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      setProducts(response.products);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetchProducts: fetchProducts,
    createProduct: async (productData: ProductData) => {
      try {
        await productService.createProduct(productData);
        fetchProducts(); // Refresh the list after creation
      } catch (error) {
        throw error;
      }
    },
    updateProduct: async (id: number, productData: Partial<ProductData>) => {
      try {
        await productService.updateProduct(id, productData);
        fetchProducts(); // Refresh the list after update
      } catch (error) {
        throw error;
      }
    },
    deleteProduct: async (id: number) => {
      try {
        await productService.deleteProduct(id);
        fetchProducts(); // Refresh the list after deletion
      } catch (error) {
        throw error;
      }
    }
  };
};

export default productService;