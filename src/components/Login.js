import '../style.css'

function Login() {
    return(
        <div className='login-page'>
            <div className='login-menu'>
                <h4>Enter your details to Log In</h4>
                <input className='input' type='text' placeholder='Email' style={{marginBottom: '1.5rem'}} />
                <input className='input' type='password' placeholder='Password' style={{marginBottom: '1.5rem'}}/>
                <button className='login-button'> Log In</button>
            </div>
        </div>
    )
}

export default Login;