import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import timelessstyle from "../assets/timeless-style.png";

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-4 pb-3">
      <div className="container">
        <div className="row">
          {/* Left Section: Logo */}
          <div className="col-md-3">
            <img 
              src={timelessstyle} 
              alt="Timeless Style Logo" 
              height="100" 
              className="me-2"
            />
          </div>

          {/* Center Section: Address */}
          <div className="col-md-3">
            <h5><strong>Address</strong></h5>
            <div className="contact-info">
              <div className="mb-2">
                <i className="fas fa-map-marker-alt text-danger me-2"></i>
                Timeless Style Hair Salon, HQ<br />
                123 Serenity Street, Georgetown,<br />
                Penang, 10200, Malaysia
              </div>
              
              <div className="mb-2">
                <i className="fas fa-phone text-primary me-2"></i>
                +60 12-345 8789
              </div>
              
              <div className="mb-2">
                <i className="fas fa-envelope text-primary me-2"></i>
                contact@timelessstyle.com
              </div>
              
              <div>
                <i className="fas fa-globe text-primary me-2"></i>
                www.timelessstyle.com
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="col-md-3">
            <h5><strong>Working Hours</strong></h5>
            <div className="hours-info">
              Monday - Thursday: 10:00 AM - 7:00 PM<br />
              Friday: 10:00 AM - 8:00 PM<br />
              Saturday: 9:00 AM - 8:00 PM<br />
              Sunday: 9:00 AM - 6:00 PM
            </div>
          </div>

          {/* Social Media & Terms */}
          <div className="col-md-3 text-center">
            <h5><strong>Social Media</strong></h5>
            <div className="social-links mb-3">
              <a href="#" className="text-dark me-3">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="text-dark me-3">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-dark me-3">
                <i className="fab fa-whatsapp fa-2x"></i>
              </a>
              <a href="#" className="text-dark">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
            <Link className="text-decoration-none text-dark" to="/terms">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-4 pt-3">
          <small className="text-muted">
            Timeless Style Sdn Bhd (1060503-H). &copy; {new Date().getFullYear()} All Rights Reserved
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;