import "../style.css";
import React, { useState, useCallback } from 'react';
import service1 from '../assets/service1.jpeg';
import service2 from '../assets/service2.png';
import ImageViewer from 'react-simple-image-viewer';

function Service() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const artifacts = [
        {
            name: "Bako National Park",
            location: "Kuching, Sarawak",
            imgSrc: service1,
            link: "#"
        },
        {
            name: "Granite rocks",
            location: "Kuantan, Pahang",
            imgSrc: service2,
            link: "#"
        },
        // ... add more artifacts here
    ];

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setIsViewerOpen(false);
    };

    return (
        <div className="report-page">
            <h1>Service / Training</h1>
            <div className="search-container">
                <input type="text" placeholder="Search Service / Training" className="search-bar" />
                <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
            <div className="artifacts-grid">
                {artifacts.map((artifact, index) => (
                    <div className="multimedia-card" key={index} onClick={() => openImageViewer(index)} >
                        <img src={artifact.imgSrc} alt={artifact.name} className="multimedia-image" key={index}/>
                        <div className="overlay">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-zoom-in" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                                <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
                                <path fillRule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                            <p style={{marginLeft: '5px'}}>Click to view</p>
                        </div>
                    </div>
                ))}

                {isViewerOpen && (
                    <ImageViewer
                        src={artifacts.map(artifact => artifact.imgSrc)} // Pass all image sources
                        currentIndex={currentImage}
                        onClose={closeImageViewer}
                        backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000 }} // Ensure high z-index
                        closeOnClickOutside={true} // Optional: close the viewer when clicking outside
                    />
                )}
            </div>
        </div>
    );
}

export default Service;