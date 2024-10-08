import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/landing.css';
import heroImage from '../assets/heroimage.png'
import heroImage2 from '../assets/heroimage2.png'
import AdvancedSearchModal from '../components/modal/AdvancedSearch';

const Landing2 = ({user}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchArtifacts = async () => {
        try {
            // setLoading(true); // Start loading
            const response = await fetch('https://geoid-rest.vercel.app/models');
            const data = await response.json();
            const publicModel = data.filter(model => model.access === 'public');
            setModels(publicModel);
        } catch (error) {
            console.error('Error fetching artifacts:', error);
        } finally {
            // setLoading(false);
        }
    };

    fetchArtifacts();
}, []);

  const handleSimpleSearch = () => {
    navigate('/home', { state: { keyword: searchKeyword } });
  };

  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  const handleViewModel = (model, data) => {
    navigate('/model/view-model', { state: { model, data } });
  };

  const handleUploadClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };


  function Modal({ isVisible, onClose }) {
    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Upload</h2>
                <button onClick={() => navigate('/upload')} className="modal-button">Upload Model</button>
                <button onClick={() => navigate('/upload-reports')} className="modal-button">Upload Reports</button>
                <button onClick={() => navigate('/upload-multimedia')} className="modal-button">Upload Multimedia</button>
                <button onClick={onClose} className="modal-close-button-upload">Close</button>
            </div>
        </div>
    );
  }

  return (
    <div className="landing-container" style={{ overflow: 'hidden' }}>
      <main>
        <section className="hero">
          <h1>Discover Immersive Diary of The Earth</h1>
          <button className="explore-btn" onClick={() => navigate('/home')}>Explore</button>
          <img className='hero-image' src={heroImage}/>
          <img className='hero-image2' src={heroImage2}/>
          <div className="triangle triangle1"></div>
          <div className="triangle triangle2"></div>
          <div className="triangle triangle3"></div>
          <div className="triangle triangle4"></div>
          <div className="triangle triangle5"></div>
          <div className="triangle triangle6"></div>
          <div className="triangle triangle7"></div>
          <div className="triangle triangle8"></div>
          <div className="triangle triangle9"></div>
        </section>

        <section className="geoid">
          <h2>GEOID</h2>
          <p>Geospatial Integrated Database</p>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSimpleSearch}>Search</button>
          </div>
          <a onClick={openModal} style={{cursor: 'pointer'}} className="advanced-search">Advance search</a>
        </section>

        <section className="models">
          <h2>3D MODELS</h2>
          <p>Explore all registered geo-heritage and archaeological sites in 3D models</p>
          <img className='hero-image3' src={heroImage2}/>
          <div className="model-cards">
            {models.slice(-3).map((model) => (
              <div key={model.id} className="model-card">
                <div className="card-inner">
                  <div className="card-front" 
                    style={{ backgroundImage: `url(${model.imgSrc})` }}>
                  </div>
                  <div className="card-back">
                    <h3>{model.name}</h3>
                    <p>{model.location}</p>
                    <button onClick={() => handleViewModel(model.model, model.data)} className="view-button">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="more-btn" onClick={() => navigate('/model')}>Explore More</button>
        </section>

        <section className="upload">
          <h2>Want to upload your own materials?</h2>
          {!user &&(
            <>
              <p>Register now!</p>
              <button onClick={() => navigate('/register')} className="register-btn" style={{marginRight: "10px"}}>Register</button>
              <button onClick={() => navigate('/login')} className="register-btn">Login</button>
            </>
          )}

          {user &&(
            <>
              <p>Upload now!</p>
              <button onClick={handleUploadClick} className="register-btn">Upload</button>
            </>
          )}
        </section>
      </main>

      <AdvancedSearchModal isOpen={isModalOpen} onClose={closeModal} />
      <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default Landing2;