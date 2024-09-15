import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // Start loading

        try {
            const response = await axios.post('https://geoid-rest.vercel.app/login', {
                username,
                password
            });

            const userData = response.data;

            localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
            onLogin(userData); // Notify App component of the login
            navigate('/home');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='login-page'>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <div className='login-menu'>
                <h1>GeoID</h1>
                <h4>Enter your details to Log In</h4>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div style={{width: "95%"}}>
                    <input
                        className='input'
                        type='text'
                        placeholder='Username'
                        style={{
                            display: 'block',
                            width: '100%',
                            marginBottom: '1.5rem',
                            padding: '10px',
                            fontSize: '16px'
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className='input'
                        type='password'
                        placeholder='Password'
                        style={{
                            display: 'block',
                            width: '100%',
                            marginBottom: '1.5rem',
                            padding: '10px',
                            fontSize: '16px'
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div onClick={handleLogin} className="login-button" style={{ marginTop: '20px', width: '100%' }}>
                    <button
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: '#2a699d',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                    >
                        Log In
                    </button>
                </div>
                <span
                    onClick={() => navigate('/register')}
                    style={{ 
                        marginTop: '20px', 
                        color: '#2a699d', 
                        cursor: 'pointer', 
                        display: 'block', 
                        textAlign: 'center' 
                    }}
                >
                    Register new account
                </span>
            </div>
        </div>
    );
}

export default Login;