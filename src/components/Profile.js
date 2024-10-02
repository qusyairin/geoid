import '../style.css';
import ProfileImage from '../assets/profile.jpg';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { bucketDb } from './helpers/Config';

function UploadsModal({ isOpen, onClose, uploads, onDelete }) {
    if (!isOpen) return null;

    const handleDelete = (type, id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            onDelete(type, id);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content-upload uploads-modal">
                <h2>My Uploads</h2>
                <div className="uploads-section">
                    <h3>Models</h3>
                    {uploads.models.length > 0 ? (
                        <ul>
                            {uploads.models.map((model, index) => (
                                <li key={index}>
                                    <span>{model.name || `Model ${index + 1}`}</span>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete('model', model._id)}
                                        aria-label="Delete model"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No models uploaded yet.</p>
                    )}
                </div>
                <div className="uploads-section">
                    <h3>Reports</h3>
                    {uploads.reports.length > 0 ? (
                        <ul>
                            {uploads.reports.map((report, index) => (
                                <li key={index}>
                                    <span>{report.title || `Report ${index + 1}`}</span>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete('report', report._id)}
                                        aria-label="Delete report"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reports uploaded yet.</p>
                    )}
                </div>
                <div className="uploads-section">
                    <h3>Multimedia</h3>
                    {uploads.reports.length > 0 ? (
                        <ul>
                            {uploads.media.map((media, index) => (
                                <li key={index}>
                                    <span>{media.name || `Media ${index + 1}`}</span>
                                    <button 
                                        className="delete-button" 
                                        onClick={() => handleDelete('media', media._id)}
                                        aria-label="Delete media"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reports uploaded yet.</p>
                    )}
                </div>
                <button className="modal-close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

function Profile() {
    const [profileData, setProfileData] = useState({
        username: '',
        biography: '',
        displayName: '',
        address: '',
        tagline: '',
        email: '',
        profile_picture_url: '',
        type: '',
    });

    const [originalData, setOriginalData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [showUploadsModal, setShowUploadsModal] = useState(false);
    const [userUploads, setUserUploads] = useState({ models: [], reports: [], media: [] });

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            try {
                const savedUser = JSON.parse(localStorage.getItem('user'));
                const userId = savedUser ? savedUser.user._id : null;

                if (userId) {
                    const response = await fetch(`https://geoid-rest.vercel.app/users/${userId}`);
                    const data = await response.json();
                    setProfileData({
                        id: data.id,
                        username: data.username,
                        biography: data.biography || '',
                        displayName: data.display_name,
                        profile_picture_url: data.profile_picture_url,
                        address: data.address || '',
                        tagline: data.tagline || '',
                        email: data.email,
                        type: data.type
                    });
                    setOriginalData({
                        id: data.id,
                        username: data.username,
                        biography: data.biography || '',
                        displayName: data.display_name,
                        profile_picture_url: data.profile_picture_url || '',
                        address: data.address || '',
                        tagline: data.tagline || '',
                        email: data.email,
                        type: data.type
                    });
                } else {
                    console.error('User ID not found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const fetchUserUploads = async () => {
        try {
            setLoading(true)
            const savedUser = JSON.parse(localStorage.getItem('user'));
            const userId = savedUser ? savedUser.user._id : null;
            const modelsResponse = await fetch('https://geoid-rest.vercel.app/models');
            const reportsResponse = await fetch('https://geoid-rest.vercel.app/paper_report');
            const mediaResponse = await fetch('https://geoid-rest.vercel.app/media');
            
            const modelsData = await modelsResponse.json();
            const reportsData = await reportsResponse.json();
            const mediaData = await mediaResponse.json();
            const userModels = modelsData.filter(model => model.userId === userId);
            const userReports = reportsData.filter(report => report.userId === userId);
            const userMedia = mediaData.filter(media => media.userId === userId);

            setUserUploads({ models: userModels, reports: userReports, media: userMedia });
        } catch (error) {
            console.error('Error fetching user uploads:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleShowUploads = () => {
        fetchUserUploads();
        setShowUploadsModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            try {
                setLoading(true);
                const savedUser = JSON.parse(localStorage.getItem('user'));
                const userId = savedUser ? savedUser.user._id : null;

                let profilePictureUrl = profileData.profile_picture_url.url;

                if (imageFile) {
                    const fileRef = ref(bucketDb, `${userId}-${imageFile.name}`);
                    const snapshot = await uploadBytes(fileRef, imageFile);
                    profilePictureUrl = await getDownloadURL(snapshot.ref);
                }

                if (userId) {
                    const response = await fetch(`https://geoid-rest.vercel.app/users/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            biography: profileData.biography,
                            display_name: profileData.displayName,
                            address: profileData.address,
                            profile_picture_url: {
                                url: imageFile ? profilePictureUrl : ''
                            },
                            tagline: profileData.tagline
                        })
                    });

                    if (response.ok) {
                        toast.success("Profile saved successfully!");
                        setIsEditing(false);
                        setOriginalData(profileData);
                    } else {
                        console.error('Failed to update profile');
                    }
                } else {
                    console.error('User ID not found in localStorage');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setIsEditing(true);
        }
    };

    const handleCancel = () => {
        setProfileData(originalData);  // Reset to original data
        setIsEditing(false);  // Exit editing mode
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData({
                    ...profileData,
                    profile_picture_url: {
                        url: reader.result}
                });
            };
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    const handleUploadClick = () => {
        document.getElementById('fileInput').click(); // Trigger the file input click
    };

    const handleDelete = async (type, id) => {
        try {
            let endpoint;
            if (type === 'model'){
                endpoint = 'models'
            } else if (type === 'reports') {
                endpoint = 'paper_report'
            } else if (type === 'media') {
                endpoint = 'media'
            }
            const response = await fetch(`https://geoid-rest.vercel.app/${endpoint}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUserUploads(prevUploads => ({
                    ...prevUploads,
                    [type + 's']: prevUploads[type + 's'].filter(item => item.id !== id)
                }));
                toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
            } else {
                toast.error(`Failed to delete ${type}`);
            }
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            toast.error(`Error deleting ${type}`);
        }

        fetchUserUploads();
    };

    return (
        <div className="profile-container">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <h1>Profile</h1>
            <div className="profile-content">
                <div className="profile-info">
                <div className="profile-image">
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: 'none' }} // Hide the input
                        onChange={handleFileChange}
                    />
                    <img 
                        src={profileData.profile_picture_url.url || ProfileImage} 
                        alt="Profile" 
                    />
                    {isEditing && (
                        <div className="overlay" onClick={handleUploadClick}>
                            <span>Upload Profile Picture</span>
                        </div>
                    )}
                </div>
                    <div className="profile-details">
                        <h2 style={{marginTop: "0px", marginBottom: "0px"}}>{profileData.username}</h2>
                        <p className="profile-type" style={{marginTop: "0px" , marginBottom: "0px"}}>{profileData.type === "owner" ? "Data Owner" : "Data User"}</p>
                        <p style={{marginTop: "0px" }}>{profileData.displayName}</p>
                    </div>
                </div>
                {/* {profileData.type === 'owner' &&( */}
                    <button className="models-button" onClick={handleShowUploads}>My Uploads {'>'}</button>
                {/* )} */}
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={profileData.username} readOnly />
                </div>
                <div className="form-group">
                    <label>Biography</label>
                    <input
                        type="text"
                        name="biography"
                        placeholder="Enter your biography"
                        value={profileData.biography}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isEditing ? 'editing' : ''}
                    />
                </div>
                <div className="form-group">
                    <label>Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        value={profileData.displayName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isEditing ? 'editing' : ''}
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isEditing ? 'editing' : ''}
                    />
                </div>
                <div className="form-group">
                    <label>Your Tagline</label>
                    <input
                        type="text"
                        name="tagline"
                        placeholder="Describe yourself..."
                        value={profileData.tagline}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={isEditing ? 'editing' : ''}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={profileData.email} readOnly />
                </div>
                <div className="button-profile-container">
                    {isEditing && (
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className={`edit-profile-button ${isEditing ? 'save-mode' : ''}`}
                    >
                        {isEditing ? 'Save' : 'Edit Profile'}
                    </button>
                </div>
            </form>
            <ToastContainer />
            <UploadsModal 
                isOpen={showUploadsModal} 
                onClose={() => setShowUploadsModal(false)} 
                uploads={userUploads} 
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Profile;