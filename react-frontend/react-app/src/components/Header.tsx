import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TSLogo from "../assets/TS.png";
import personfill from "../assets/person-fill.svg";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={TSLogo} 
            alt="Timeless Style Logo" 
            height="60" 
            className="me-2"
            />
          </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/styleguide">Hair Style Guide</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service">Our Services</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/booking">Bookings</Link>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <button 
            className="btn btn-link p-0" 
            type="button" 
            id="userDropdown" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            <img 
              src={personfill} 
              alt="User logo" 
              height="50" 
              className="me-2"
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
            <li><Link className="dropdown-item" to="/login">Login</Link></li>
            <li><Link className="dropdown-item" to="/register">Register</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
