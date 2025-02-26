import { useState } from "react";
import { useProductData } from "../services/ProductService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

interface ProductDetailsModalProps {
  product: any;
  show: boolean;
  onHide: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, show, onHide }) => {
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
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
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
  const { products, loading, error } = useProductData();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Our Products</h1>
        <p className="lead text-muted">
          Discover our premium hair care products
        </p>
      </div>

      {/* Category Filter */}
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

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Products Grid */}
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div key={product.product_id} className="col-md-4 col-lg-3">
            <div className="card h-100 product-card">
              <div 
                className="product-image-wrapper"
                style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedProduct(product)}
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="card-img-top h-100 w-100"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                    <i className="fas fa-box fa-3x text-secondary"></i>
                  </div>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text product-price">
                  RM {product.price.toFixed(2)}
                </p>
                <button
                  className="btn btn-outline-dark w-100"
                  onClick={() => setSelectedProduct(product)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        show={!!selectedProduct}
        onHide={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Products;