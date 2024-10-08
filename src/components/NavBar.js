import "../assets/navbar.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function NavBar({ user, onLogout }) {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false); // State to handle burger menu

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
                    <button onClick={() => navigatePage('/upload-multimedia')} className="modal-button">Upload Multimedia</button>
                    <button onClick={onClose} className="modal-close-button-upload">Close</button>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen); // Toggle burger menu visibility
    };

    return (
        <header className="navbar-component">
            <div className="navbar">
                <div className="navbar-container">
                    <div className="logo">
                        GeoID
                        <div className="menu" onClick={toggleNav}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00712D" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>
                        </div>
                    </div>

                    <nav className={`nav-links ${isNavOpen ? "open" : ""}`}>
                        <a onClick={() => navigate("/")}>Home</a>
                        <a onClick={() => navigate("/home")}>Explore</a>
                        <a onClick={() => navigate("/reports")}>Report</a>
                        <a onClick={() => navigate("/model")}>Model</a>
                        <a onClick={() => navigate("/multimedia")}>Multimedia</a>
                        <a onClick={() => navigate("/service-training")}>Activities</a>

                        {user && (
                        <div className="logged-button">
                            {(user.type === 'admin' || !user.type) && (
                                <button onClick={() => navigate("/admin-dashboard")} className="admin-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                                    </svg>
                                    <span>Admin Dashboard</span>
                                </button>
                            )}
                            <button onClick={handleUploadClick} className="upload-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708 .708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0"/>
                                </svg>
                                <span>Upload</span>
                            </button>

                            <div className="user-dropdown" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                                <span className="username">{user.username}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00712D" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                                {isDropdownVisible && (
                                    <div className="dropdown-menu">
                                        <img src={user.profile_picture_url.url} className="profile-dropdown"/>
                                        <p style={{color: 'black'}}>Hello, {user.display_name}</p>
                                        <button onClick={() => navigate("/profile")}>Profile</button>
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {!user && (
                        <div className="login-button">
                            <button onClick={() => navigate("/login")}>Login</button>
                        </div>
                    )}
                    </nav>
                </div>
            </div>

            <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
        </header>
    );
}

export default NavBar;