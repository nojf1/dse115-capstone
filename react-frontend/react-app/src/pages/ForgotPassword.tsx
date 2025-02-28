import React, { useState } from 'react';
import { memberService } from '../services/MemberService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    setResetLink('');
    
    try {
      const response = await memberService.forgotPassword(email);
      setSuccess('Password reset instructions have been sent to your email.');
      
      // For development/testing only - display the link
      if (response.resetLink) {
        setResetLink(response.resetLink);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Forgot password error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Forgot Your Password?</h2>
              <p className="text-center text-muted mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}
              
              {/* Development only - display reset link for testing */}
              {resetLink && (
                <div className="alert alert-info" role="alert">
                  <p><strong>Development Mode:</strong> Use this link to reset your password:</p>
                  <a href={resetLink} className="d-block overflow-auto">
                    {resetLink}
                  </a>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : 'Send Reset Link'}
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-3">
                <a href="/login" className="text-decoration-none">Back to Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;