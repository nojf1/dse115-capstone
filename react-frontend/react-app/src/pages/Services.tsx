import { useServiceData } from "../services/ServicesService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Services = () => {
  const { services, loading, error } = useServiceData();

  // Group services by category (you can add more categories)
  const categories = {
    "Hair Cuts": services.filter(s => s.name.toLowerCase().includes("cut")),
    "Coloring": services.filter(s => s.name.toLowerCase().includes("color")),
    "Treatments": services.filter(s => s.name.toLowerCase().includes("treatment")),
    "Styling": services.filter(s => 
      !s.name.toLowerCase().includes("cut") && 
      !s.name.toLowerCase().includes("color") && 
      !s.name.toLowerCase().includes("treatment")
    )
  };

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Our Services</h1>
        <p className="lead text-muted">
          Discover our range of professional hair care services
        </p>
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

      {/* Services Grid */}
      <div className="row g-4">
        {Object.entries(categories).map(([category, categoryServices]) => (
          categoryServices.length > 0 && (
            <div key={category} className="col-12 mb-5">
              <h2 className="text-center mb-4 service-category-title">
                {category}
              </h2>
              <div className="row g-4">
                {categoryServices.map((service: any) => (
                  <div key={service.service_id} className="col-md-6 col-lg-4">
                    <div className="card h-100 service-card">
                      <div className="card-body">
                        <h5 className="card-title">{service.name}</h5>
                        {service.description && (
                          <p className="card-text text-muted">
                            {service.description}
                          </p>
                        )}
                        <div className="service-price">
                          RM {service.price && typeof service.price === "number"
  ? service.price.toFixed(2)
  : (Number(service.price) || 0).toFixed(2)}

                        </div>
                      </div>
                      <div className="card-footer bg-transparent border-0">
                        <button 
                          className="btn btn-dark w-100"
                          onClick={() => {/* Add booking logic */}}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Services;