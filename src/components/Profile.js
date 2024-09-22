import '../style.css';
import ProfileImage from '../assets/profile.jpg';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { bucketDb } from './helpers/Config';

function Profile() {
    const [profileData, setProfileData] = useState({
        username: '',
        biography: '',
        displayName: '',
        address: '',
        tagline: '',
        email: '',
        profile_picture_url: ''
    });

    const [originalData, setOriginalData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);

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
                        username: data.username,
                        biography: data.biography || '',
                        displayName: data.display_name,
                        profile_picture_url: data.profile_picture_url,
                        address: data.address || '',
                        tagline: data.tagline || '',
                        email: data.email
                    });
                    setOriginalData({
                        username: data.username,
                        biography: data.biography || '',
                        displayName: data.display_name,
                        profile_picture_url: data.profile_picture_url || '',
                        address: data.address || '',
                        tagline: data.tagline || '',
                        email: data.email
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
                        <h2>{profileData.username}</h2>
                        <p>{profileData.displayName}</p>
                    </div>
                </div>
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
        </div>
    );
}

export default Profile;