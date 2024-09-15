import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../style.css";

function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // To manage error modal visibility
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const { username, displayName, password, email } = formData;
    
    setIsLoading(true);

    try {
      const response = await axios.post('https://geoid-rest.vercel.app/users', {
        username: username,
        display_name: displayName,
        email: email,
        tagline: '',
        profile_picture_url: {
          url: '',
          metadata: { type: 'image/jpeg', size: 1024 },
        },
        biography: '',
        password: password,
        type: formData.role === 'User' ? 'user' : 'owner',
      });

      console.log('Registration response:', response);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(error.response.data);
      setIsErrorModalOpen(true); // Show error modal
    } finally {
      setIsLoading(false);
    }
  };

  const closeModalAndNavigate = () => {
    setIsModalOpen(false);
    navigate('/login');
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="login-page">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}

      <div className="login-menu">
        <h1>GeoID</h1>
        <h4>Please fill in your details to register</h4>
        <input
          className="input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          style={{ marginBottom: "1.5rem" }}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <input
          className="input"
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={formData.displayName}
          onChange={handleInputChange}
          style={{ marginBottom: "1.5rem" }}
        />
        {errors.displayName && <p className="error">{errors.displayName}</p>}

        <input
          className="input"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ marginBottom: "1.5rem" }}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          style={{ marginBottom: "1.5rem" }}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          className="input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          style={{ marginBottom: "1.5rem" }}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <h4>Type of User</h4>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '2rem' }}>
              <input type="radio" id="user" name="role" value="User" checked={formData.role === "User"} onChange={handleInputChange} />
              <label htmlFor="user" style={{ marginLeft: '0.5rem' }}>User Role</label>
            </div>
            <div>
              <input type="radio" id="dataOwner" name="role" value="DataOwner" checked={formData.role === "DataOwner"} onChange={handleInputChange} />
              <label htmlFor="dataOwner" style={{ marginLeft: '0.5rem' }}>Data Owner Role</label>
            </div>
          </div>
        </div>

        <div className="login-button" style={{ marginTop: "20px", width: "100%" }}>
          <button onClick={handleRegister} style={{ width: "100%" }}>Register</button>
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="modal-register">
          <div className="modal-content-register">
            <h2>Successfully Registered</h2>
            <p>You have successfully registered. Click the button below to go to the login page.</p>
            <button className="modal-button-register" onClick={closeModalAndNavigate}>Back to Login</button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {isErrorModalOpen && (
        <div className="modal-register">
          <div className="modal-content-register">
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button className="modal-button-register" onClick={closeErrorModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;