import "../style.css";

function Register() {
  return (
    <div className="login-page">
      <div className="login-menu">
        <h1>GeoID</h1>
        <h4>Please fill in your details to register</h4>
        <input
          className="input"
          type="text"
          placeholder="Username"
          style={{ marginBottom: "1.5rem" }}
        />
        <input
          className="input"
          type="text"
          placeholder="Display Name"
          style={{ marginBottom: "1.5rem" }}
        />
        <input
          className="input"
          type="text"
          placeholder="Email"
          style={{ marginBottom: "1.5rem" }}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          style={{ marginBottom: "1.5rem" }}
        />
        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          style={{ marginBottom: "1.5rem" }}
        />
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <h4>Type of User</h4>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '2rem' }}>
              <input type="radio" id="user" name="role" value="User" defaultChecked />
              <label htmlFor="user" style={{ marginLeft: '0.5rem' }}>User Role</label>
            </div>
            <div>
              <input type="radio" id="dataOwner" name="role" value="DataOwner" />
              <label htmlFor="dataOwner" style={{ marginLeft: '0.5rem' }}>Data Owner Role</label>
            </div>
          </div>
        </div>
        <div
          className="login-button"
          style={{ marginTop: "20px", width: "100%" }}
        >
          <button style={{ width: "100%" }}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
