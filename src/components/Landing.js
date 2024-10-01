import React, { useState } from 'react';
import '../style.css';
import AdvancedSearchModal from '../components/modal/AdvancedSearch'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

function Landing() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSimpleSearch = () => {
        navigate('/home', { state: { keyword: searchKeyword } });
    };

    return(
        <div className="landing">
            <h1 className='title'>GeoID</h1>
            <p style={{color: 'white', fontWeight: 'bold'}}>Geospatial Integrated Database</p>
            <p className='system-name'>Discover Immersive Diary of The Earth</p>
            
            {/* New introduction section */}
            {/* <div className="intro-section">
                <h2>Welcome to GeoID</h2>
                <p>
                    GeoID is a centralized digital platform that consolidates localized geospatial data, 
                    improving data accessibility with cost-efficient solutions. Our platform:
                </p>
                <ul>
                    <li>Enhances data visualization, improving decision-making.</li>
                    <li>Enhances data science skills of professionals and stimulates interest in S&T among the youngest.</li>
                    <li>Safeguards valuables (e.g., geological heritage).</li>
                    <li>Enhances the sustainability & competitiveness of local industries.</li>
                </ul>
            </div> */}

            <div className='search-bar'>
                <input type='text' 
                    placeholder='Search ...' 
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}/>
                <button 
                    onClick={handleSimpleSearch}
                    className="search-button-landing"
                    >
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
            <div className='advanced-search'>
                <button className="advanced-search-button" onClick={openModal}>Advanced Search</button>
            </div>
            <AdvancedSearchModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}

export default Landing;