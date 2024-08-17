import '../style.css';
import ProfileImage from '../assets/profile.jpg'
function Profile() {
    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <div className="profile-content">
                <div className="profile-info">
                    <div className="profile-image">
                        <img src={ProfileImage} />
                    </div>
                    <div className="profile-details">
                        <h2>user33</h2>
                        <p>Digital Geoscience Global</p>
                    </div>
                </div>
                <button className="models-button">Go to my models {'>'}</button>
            </div>

            <form className="profile-form">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value="user33" readOnly />
                </div>
                <div className="form-group">
                    <label>Biography</label>
                    <input type="text" placeholder="" />
                </div>
                <div className="form-group">
                    <label>Display Name</label>
                    <input type="text" value="Digital Geoscience Global" readOnly />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" placeholder="" />
                </div>
                <div className="form-group">
                    <label>Your Tagline</label>
                    <input type="text" placeholder="describe yourself..." />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value="user33@gmail.com" readOnly />
                </div>
                <button className="edit-profile-button">Edit Profile</button>
            </form>
        </div>
    );
}

export default Profile;
