import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/register.css'; // Assuming you'll create or update this stylesheet

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.displayName) newErrors.displayName = "Display Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { username, displayName, email, password, role } = formData;
      const response = await axios.post('https://geoid-rest.vercel.app/users', {
        username,
        display_name: displayName,
        email,
        password,
        type: role === 'User' ? 'user' : 'owner',
      });
      setIsSuccessModalOpen(true);
    } catch (error) {
      setErrorMessage('Registration failed. Please check your input.');
      setIsErrorModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/login');
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="register-page-container">
      <div className="register-card">
        <div className="register-content">
          {/* Left Section */}
          <div className="register-left-section">
            <h2 className="register-title" style={{color: 'white'}}>Join GeoID Today!</h2>
            <p className="register-subtitle" style={{color: 'white'}}>Fill in your details to embark on your journey!</p>
            <p className="register-subtitle" style={{color: 'white'}}>Already have an account?</p>
            <button className="login-button-register" onClick={() => navigate('/login')}>Log In</button>
          </div>

          {/* Right Section */}
          <div className="register-right-section">
            <h2 className="register-title">Register</h2>
            <p className="register-subtitle">Create your account by providing your details.</p>
            {Object.keys(formErrors).length > 0 && (
              <div className="register-error-message">
                {Object.values(formErrors).map((error, index) => <p key={index}>{error}</p>)}
              </div>
            )}
            <form onSubmit={handleRegister}>
              <input
                className="register-input"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                className="register-input"
                type="text"
                name="displayName"
                placeholder="Display Name"
                value={formData.displayName}
                onChange={handleInputChange}
                required
              />
              <input
                className="register-input"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                className="register-input"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                className="register-input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div className="register-role-selection">
                <h4>Select Role</h4>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="User"
                    checked={formData.role === 'User'}
                    onChange={handleInputChange}
                  /> User Role
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="DataOwner"
                    checked={formData.role === 'DataOwner'}
                    onChange={handleInputChange}
                  /> Data Owner Role
                </label>
              </div>
              <button className="register-button" type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="register-loading-overlay">
          <div className="register-spinner"></div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="modal-success">
          <div className="modal-content-success">
            <h2 className="modal-title-success">Successfully Registered</h2>
            <p className="modal-message-success">You have successfully registered. Click the button below to go to the login page.</p>
            <button className="modal-button-success" onClick={closeSuccessModal}>Back to Login</button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {isErrorModalOpen && (
        <div className="modal-register">
          <div className="modal-content_register">
            <h2 className="modal-title">Error</h2>
            <p className="modal-message">{errorMessage}</p>
            <button className="modal-button_register" onClick={closeErrorModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;