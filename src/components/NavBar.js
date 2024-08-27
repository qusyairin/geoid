import "../style.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function NavBar() {

    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleUploadClick = () => {
      setIsModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setIsModalVisible(false);
    };

    const navigatePage = (route) => {
      setIsModalVisible(false);
      navigate(route);
    }

    function Modal({ isVisible, onClose }) {
      if (!isVisible) return null;
    
      return (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Upload</h2>
            <button onClick={() => navigatePage('/upload')} className="modal-button">Upload Model</button>
            <button onClick={() => navigatePage('/upload-reports')} className="modal-button">Upload Reports</button>
            <button onClick={onClose} className="modal-close-button-upload">Close</button>
          </div>
        </div>
      );
    }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>GeoID</div>
        <nav className="nav-links">
          <a className="navbarItem" onClick={() => navigate("/home")}>Home</a>
          <a className="navbarItem" onClick={() => navigate("/reports")}>Reports</a>
          <a className="navbarItem" onClick={() => navigate("/model")}>Model</a>
          <a className="navbarItem" onClick={() => navigate("/multimedia")}>Multimedia</a>
          <a className="navbarItem" onClick={() => navigate("/service-training")}>Service/Training</a>
        </nav>
        <div className="login-button">
          <span
            onClick={handleUploadClick}
            style={{ marginRight: "30px", color: "white", cursor: "pointer" }}
          >
            Upload
          </span>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>

      <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
    </header>
  );
}

export default NavBar;