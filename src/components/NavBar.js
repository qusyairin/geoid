import "../style.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function NavBar({ user, onLogout }) {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleUploadClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const navigatePage = (route) => {
        setIsModalVisible(false);
        navigate(route);
    };

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

    const handleLogout = () => {
        onLogout(); // Clear user data
        navigate('/'); // Redirect to the home page
    };

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
                    {user ? (
                        <>
                            <button
                                onClick={handleUploadClick}
                                className="upload-link"
                            >
                                Upload
                            </button>
                            <div className="user-dropdown" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                                <span className="username">{user.username}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                                {isDropdownVisible && (
                                    <div className="dropdown-menu">
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/login")}>Login</button>
                        </>
                    )}
                </div>
            </div>

            <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
        </header>
    );
}

export default NavBar;