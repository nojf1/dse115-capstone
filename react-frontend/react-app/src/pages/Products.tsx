import React, { useState, useEffect } from 'react';
import { useCart } from '../services/CartContext';
import { useAuth } from '../services/AuthContext';
import { productService } from '../services/ProductService'; // You may need to create this service
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

interface ProductDetailsModalProps {
  product: any;
  show: boolean;
  onHide: () => void;
  onAddToCart: (productId: number) => Promise<void>;
  isAddingToCart: boolean;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ 
  product, 
  show, 
  onHide,
  onAddToCart,
  isAddingToCart 
}) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{product.name}</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onHide}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {product.image_url && (
                <img 
                  src={product.image_url}
                  alt={product.name}
                  className="img-fluid mb-3 product-detail-image"
                />
              )}
              <h6 className="fw-bold mb-2">Price: RM {product.price.toFixed(2)}</h6>
              <p className="mb-3">{product.description}</p>
              <div className="product-details">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Stock:</strong> {product.stock_quantity} units</p>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button 
                className="btn btn-dark"
                onClick={() => onAddToCart(product.product_id || product.id)}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding...
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
              <button 
                type="button" 
                className="btn btn-outline-dark btn-lg" 
                onClick={onHide}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [addingToCart, setAddingToCart] = useState<Record<number, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        setProducts(response.products || []);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      alert('Please log in to add items to your cart');
      return;
    }
    
    setAddingToCart(prev => ({ ...prev, [productId]: true }));
    
    try {
      await addToCart(productId, 1);
      // Show success message
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };
  
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Our Products</h1>
      
      <div className="text-center mb-4">
        <div className="btn-group" role="group">
          {categories.map(category => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map(product => (
          <div key={product.product_id || product.id} className="col">
            <div className="card h-100 shadow">
              {product.image_url && (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted small">{product.category}</p>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text mb-0">
                    <strong>RM{parseFloat(product.price).toFixed(2)}</strong>
                  </p>
                  <button 
                    className="btn btn-dark btn-sm"
                    onClick={() => handleAddToCart(product.product_id || product.id)}
                    disabled={addingToCart[product.product_id || product.id]}
                  >
                    {addingToCart[product.product_id || product.id] ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <i className=""></i>
                    )}
                    Add to Cart
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark w-100 mt-2"
                  onClick={() => setSelectedProduct(product)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        show={!!selectedProduct}
        onHide={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isAddingToCart={!!selectedProduct && addingToCart[selectedProduct.product_id || selectedProduct.id]}
      />
    </div>
  );
};

export default Products;