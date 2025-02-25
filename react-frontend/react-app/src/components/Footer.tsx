import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import timelessstyle from "../assets/timeless-style.png";

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-4 pb-3">
      <div className="container">
        <div className="row">
          {/* Left Section: Slogan & Terms */}
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
            <h5>
              <strong>Address</strong>
            </h5>
            <p>
              <i className="fas fa-map-marker-alt text-danger"></i> Timeless
              Style Hair Salon, HQ <br />
              123 Serenity Street, Georgetown, <br />
              Penang, 10200, Malaysia
              <br />
              <div className="text-dark"><i className="fas fa-phone text-primary"></i> +60 12-345 8789{" "} </div>
              <br />
              <i className="fas fa-envelope text-primary"></i>{" "}
              contact@timelessstyle.com <br />
              <i className="fas fa-globe text-primary"></i>{" "}
              www.timelessstyle.com
            </p>
          </div>

          {/* Right Section: Working Hours */}
          <div className="col-md-3">
            <h5>
              <strong>Working Hours</strong>
            </h5>
            <p>
              Monday - Thursday: 10:00 AM - 7:00 PM <br />
              Friday: 10:00 AM - 8:00 PM <br />
              Saturday: 9:00 AM - 8:00 PM <br />
              Sunday: 9:00 AM - 6:00 PM
            </p>
          </div>

          {/* Social Media & Logo */}
          <div className="col-md-3 text-center">
            <h5>
              <strong>Social Media</strong>
            </h5>
            <a href="#" className="text-dark">
              <i className="fab fa-facebook fa-2x me-2"></i>
            </a>
            <a href="#" className="text-dark">
              <i className="fab fa-twitter fa-2x me-2"></i>
            </a>
            <a href="#" className="text-dark">
              <i className="fab fa-whatsapp fa-2x me-2"></i>
            </a>
            <a href="#" className="text-dark">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <br />
            <br />
            <Link className="text-decoration-none text-dark" to="/terms">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-3">
          <p className="mb-0">
            Timeless Style Sdn Bhd (1060503-H). &copy; All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
