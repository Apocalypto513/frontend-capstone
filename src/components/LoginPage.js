import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import binLogo from '../assets/bin-logo.png'; // You'll need to add this image to your assets folder

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials with an API
    // For now, we'll just simulate a successful login
    onLogin({ email });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="row g-0">
          {/* Left Side - Logo and welcome text */}
          <div className="col-md-6 logo-side">
            <div className="logo-content">
              <h2 className="mb-4">Welcome to Our Webpage!</h2>
              <p className="text-center mb-4">
                This is a Webpage for monitoring the waste throwout in 
                Leyte Normal University
              </p>
              <div className="text-center">
                <img src={binLogo} alt="Recycling Logo" className="logo-img" />
              </div>
            </div>
          </div>
          
          {/* Right Side - Login form */}
          <div className="col-md-6 form-side">
            <div className="login-form">
              <h2 className="mb-4 text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="Input Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Input Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="d-flex justify-content-between mt-4">
                  <Link to="/register" className="btn btn-warning register-btn">REGISTER</Link>
                  <button type="submit" className="btn btn-primary login-btn">LOG IN</button>
                </div>
                
                <div className="mt-3 text-center">
                  <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add footer */}
      <div className="footer white">
        © 2025 Leyte Normal University, All rights reserved.
      </div>
    </div>
  );
};

export default LoginPage;