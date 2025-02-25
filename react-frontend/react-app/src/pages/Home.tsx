import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero text-center text-white py-5 bg-dark">
        <div className="container">
          <h1 className="display-4 fw-bold">Timeless Style Hair Salon</h1>
          <p className="lead">Transform your look with our expert stylists.</p>
          <Link to="/booking" className="btn btn-primary btn-lg mt-3">
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="services py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Our Services</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Haircuts</h3>
                  <p className="card-text">Professional haircuts for all styles and occasions.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Coloring</h3>
                  <p className="card-text">Premium hair coloring by expert stylists.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Hair Treatment</h3>
                  <p className="card-text">Revitalize your hair with our nourishing treatments.</p>
                </div>
              </div>
            </div>
          </div>
          <Link to="/services" className="btn btn-outline-primary mt-4">
            View All Services →
          </Link>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4">Style Inspiration</h2>
          <div className="row">
            <div className="col-md-4">
              <img src="/uploads/style1.jpg" alt="Style 1" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-4">
              <img src="/uploads/style2.jpg" alt="Style 2" className="img-fluid rounded shadow" />
            </div>
            <div className="col-md-4">
              <img src="/uploads/style3.jpg" alt="Style 3" className="img-fluid rounded shadow" />
            </div>
          </div>
          <Link to="/gallery" className="btn btn-outline-dark mt-4">
            Explore More Styles →
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5 text-center">
        <div className="container">
          <h2 className="mb-4">What Our Clients Say</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="p-4 border rounded bg-white shadow-sm">
                <p>"The best haircut I've ever had! The stylists are amazing."</p>
                <strong>- Jane Doe</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 border rounded bg-white shadow-sm">
                <p>"Fantastic service and a relaxing atmosphere!"</p>
                <strong>- Mark Smith</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Booking CTA */}
      <section className="contact py-5 bg-dark text-white text-center">
        <div className="container">
          <h2 className="mb-3">Ready for a New Look?</h2>
          <p>Book your appointment today and let us take care of your style.</p>
          <Link to="/booking" className="btn btn-primary btn-lg mt-3">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
