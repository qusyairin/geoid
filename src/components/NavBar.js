import "../style.css";
import { useNavigate } from 'react-router-dom';

function NavBar() {

    const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">GeoID</div>
        <nav className="nav-links">
          <a className="navbarItem" onClick={() => navigate("/home")}>Home</a>
          <a className="navbarItem" onClick={() => navigate("/home")}>Reports</a>
          <a className="navbarItem" onClick={() => navigate("/model")}>Model</a>
          <a className="navbarItem" onClick={() => navigate("/home")}>Multimedia</a>
          <a className="navbarItem" onClick={() => navigate("/home")}>Service/Training</a>
        </nav>
        <div className="login-button">
          <span
            onClick={() => navigate("/upload")}
            style={{ marginRight: "30px", color: "white", cursor: "pointer" }}
          >
            Upload
          </span>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
