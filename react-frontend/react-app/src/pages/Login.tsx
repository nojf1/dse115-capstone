import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import timelessstyle from "../assets/timeless-style.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Register states
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await register(registerData);
      setIsLogin(true); // Switch back to login form after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container py-5">
      <div 
        className="card shadow p-4 mx-auto" 
        style={{ 
          maxWidth: "400px",
          borderRadius: "12px",
          transition: "all 0.3s ease"
        }}
      >
<div className="text-center">
  <img
    src={timelessstyle}
    alt="Timeless Style Logo"
    height="100"
    className="me-2 mb-3"
  />
  <h2 className="fw-bold mb-3">{isLogin ? "Sign in" : "Sign up"}</h2>
  <div className="d-flex align-items-center justify-content-center gap-1">
    <span className="small">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
    </span>
    <button 
      onClick={() => setIsLogin(!isLogin)}
      className="btn btn-link py-0 px-1 small text-primary text-decoration-none"
      style={{ lineHeight: '1.5' }}
    >
      {isLogin ? "Sign up" : "Sign in"}
    </button>
  </div>
</div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-check-input"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              </div>
              <Link to="/forgot-password" className="text-primary small">Forgot your password?</Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-dark w-100" 
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" />
              ) : null}
              Sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="first_name" className="form-label">First Name*</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  value={registerData.first_name}
                  onChange={handleRegisterInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="last_name" className="form-label">Last Name*</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  value={registerData.last_name}
                  onChange={handleRegisterInputChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email*</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={registerData.email}
                onChange={handleRegisterInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password*</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={registerData.password}
                onChange={handleRegisterInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={registerData.phone}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={registerData.address}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={registerData.city}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={registerData.state}
                  onChange={handleRegisterInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="postal_code" className="form-label">Postal Code</label>
                <input
                  type="text"
                  name="postal_code"
                  className="form-control"
                  value={registerData.postal_code}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={registerData.country}
                  onChange={handleRegisterInputChange}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-dark w-100"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" />
              ) : null}
              Sign up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;