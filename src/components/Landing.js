import React, { useState } from 'react';
import '../style.css';
import AdvancedSearchModal from '../components/modal/AdvancedSearch'; // Adjust path as needed

function Landing() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return(
        <div className="landing">
            <h1 className='title'>GeoID</h1>
            <p style={{color: 'white', fontWeight: 'bold'}}>Geospatial Integrated Database</p>
            <p className='system-name'>Discover Immersive Diary of The Earth</p>
            <div className='search-bar'>
                <input type='text' placeholder='Search ...'/>
                <button className="search-button-landing">
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