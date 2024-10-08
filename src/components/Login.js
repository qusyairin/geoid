import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('https://geoid-rest.vercel.app/login', {
        username,
        password
      });

      const userData = response.data;

      localStorage.setItem('user', JSON.stringify(userData));
      onLogin(userData);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-content">
          <div className="login-left-section">
            <h2 className="login-title" style={{color: 'white'}}>Welcome Back to GeoID!</h2>
            <p className="login-subtitle" style={{color: 'white'}}>Enter your log in details to continue your journey!</p>
            <p className="login-subtitle" style={{color: 'white'}}>New User?</p>
            <button className="signup-button" onClick={() => navigate('/register')}>Sign Up!</button>
          </div>
          <div className="login-right-section">
            <h2 className="login-title">Log In</h2>
            <p className="login-subtitle">Enter your log in details.</p>
            {error && <p className="login-error-message">{error}</p>}
            <form onSubmit={handleLogin}>
              <input
                className="login-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="login-button-page" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>

              <div class="line">--------------or--------------</div>

              <button className="guest-button-page" onClick={() => navigate('/')}>Continue as guest</button>
            </form>
          </div>
        </div>
      </div>
      {loading && (
        <div className="login-loading-overlay">
          <div className="login-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Login;