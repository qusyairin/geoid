import '../style.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    return(
        <div className='login-page'>
            <div className='login-menu'>
                <h1>GeoID</h1>
                <h4>Enter your details to Log In</h4>
                <input className='input' type='text' placeholder='Email' style={{marginBottom: '1.5rem'}} />
                <input className='input' type='password' placeholder='Password' style={{marginBottom: '1.5rem'}}/>
                <div className="login-button" style={{ marginTop: '20px', width: '100%'}}>
                  <button style={{width: '100%'}}>Log In</button>
                 </div>
                 <span onClick={() => navigate('/register')} style={{marginTop: '20px', color: '#2a699d', cursor: 'pointer'}}>Register new account</span>
            </div>
        </div>
    )
}

export default Login;