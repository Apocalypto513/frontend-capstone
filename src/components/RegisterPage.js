import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import binLogo from '../assets/bin-logo.png'; // You'll need to add this image to your assets folder

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    // Clear any previous error messages
    setErrorMessage('');
    
    // Show confirmation modal
    setShowConfirmation(true);
  };
  
  const handleConfirmation = () => {
    // Close the modal and redirect to login page
    setShowConfirmation(false);
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="row g-0">
          {/* Left Side - Form */}
          <div className="col-md-6 form-side">
            <div className="register-form">
              <h2 className="mb-4 text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="fullName" 
                    placeholder="Input Full Name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                
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
                
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Re-Enter Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="confirmPassword" 
                    placeholder="Input Password Again" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                {errorMessage && (
                  <div className="alert alert-danger mb-3">{errorMessage}</div>
                )}
                
                <div className="d-flex justify-content-between mt-4">
                  <Link to="/login" className="btn btn-secondary cancel-btn">CANCEL</Link>
                  <button type="submit" className="btn btn-primary create-btn">CREATE ACCOUNT</button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right Side - Logo and welcome text */}
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
        </div>
      </div>
      
      {/* Add footer */}
      <div className="footer white">
        © 2025 Leyte Normal University, All rights reserved.
      </div>
      
      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header className="confirmation-modal-header">
          <Modal.Title>Registration Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="confirmation-modal-body">
          <div className="text-center mb-3">
            <i className="fas fa-check-circle confirmation-icon"></i>
          </div>
          <p className="text-center">
            Your account has been created successfully!<br />
            You may now sign in with your credentials.
          </p>
        </Modal.Body>
        <Modal.Footer className="confirmation-modal-footer">
          <Button 
            variant="primary" 
            onClick={handleConfirmation}
            className="confirmation-button"
          >
            Proceed to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterPage;