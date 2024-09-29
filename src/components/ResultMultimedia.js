import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import "../style.css";
import ImageViewer from 'react-simple-image-viewer';
import VideoViewer from './modal/VideoViewer';

function ResultMultimedia({ filters, keyword, onOpen }) {
    const [currentMedia, setCurrentMedia] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [multimediaItems, setMultimediaItems] = useState([]); // Store original items
    const [filteredMultimedia, setFilteredMultimedia] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMultimedia = async () => {
            try {
                const response = await axios.get('https://geoid-rest.vercel.app/media');
                const publicMedia = response.data.filter(media => media.access === 'public');
                setMultimediaItems(publicMedia);
                setFilteredMultimedia(publicMedia); // Initialize filtered items
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching multimedia data:', error);
                setLoading(false); // Set loading to false if an error occurs
            }
        };

        fetchMultimedia();
    }, []);

    useEffect(() => {
        let filtered = multimediaItems;

        // if (filters.country) {
        //     filtered = filtered.filter(media => media.country?.toLowerCase() === filters.country.toLowerCase());
        // }
        if (filters.state) {
            filtered = filtered.filter(media => media.state?.toLowerCase() === filters.state.toLowerCase());
        }
        if (filters.category) {

            if (filters.category.toLowerCase() !== 'archaeology'){
                filtered = filtered.filter(media => media.category?.toLowerCase() !== "archaeology");
            } else {
                filtered = filtered.filter(media => media.category?.toLowerCase() === "archaeology");
            }
        }
        // if (filters.majorLithology) {
        //     filtered = filtered.filter(media => media.majorLithology?.toLowerCase() === filters.majorLithology.toLowerCase());
        // }
        // if (filters.discipline) {
        //     filtered = filtered.filter(media => media.discipline?.toLowerCase() === filters.discipline.toLowerCase());
        // }
        // if (filters.rockType) {
        //     filtered = filtered.filter(media => media.rockType?.toLowerCase() === filters.rockType.toLowerCase());
        // }
        // if (filters.formation) {
        //     filtered = filtered.filter(media => media.formation?.toLowerCase() === filters.formation.toLowerCase());
        // }
        // if (filters.age) {
        //     filtered = filtered.filter(media => media.age?.toLowerCase() === filters.age.toLowerCase());
        // }

        if (keyword) {
            const keywordLower = keyword.toLowerCase();
            filtered = filtered.filter(media =>
                media.name.toLowerCase().includes(keywordLower) ||
                media.location.toLowerCase().includes(keywordLower) ||
                media.category.toLowerCase().includes(keywordLower)
            );
        }

        setFilteredMultimedia(filtered);
    }, [filters, keyword, multimediaItems]); // Add multimediaItems to the dependency array

    const openMediaViewer = useCallback((index) => {
        const media = filteredMultimedia[index];
        setCurrentMedia(index);
        setIsVideo(media.type === "video");
        setIsViewerOpen(true);
    }, [filteredMultimedia]);

    const closeMediaViewer = () => {
        setIsViewerOpen(false);
    };

    const resultCount = filteredMultimedia.length;

    if (loading) {
        return <div className="loading-message">Loading data...</div>; // Display loading message
    }

    return (
        <div className="multimedia-result-page">
            <p style={{ textAlign: 'left' }}>
                Multimedia: {resultCount} result{resultCount !== 1 ? 's' : ''} found
            </p>
            <div className="multimedia-result-grid">
                {resultCount === 0 ? (
                    <p>No multimedia found.</p>
                ) : (
                    filteredMultimedia.map((item, index) => (
                        <div className="multimedia-result-card" key={item._id} onClick={() => openMediaViewer(index)}>
                            {item.type === "image" ? (
                                <img src={item.imgSrc} alt={item.name} className="multimedia-result-image" />
                            ) : (
                                <video className="multimedia-result-image" src={item.imgSrc} alt={item.name} />
                            )}
                            <div style={{cursor: 'pointer'}} className="multimedia-result-overlay">
                                <span>View Media > </span>
                            </div>
                            <div className="multimedia-result-info">
                                <h3>{item.name}</h3>
                                <p>{item.location}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {isViewerOpen && (isVideo ? (
                <VideoViewer
                    src={filteredMultimedia[currentMedia].imgSrc} // Pass video source
                    onClose={closeMediaViewer}
                />
            ) : (
                <ImageViewer
                    src={filteredMultimedia.map(item => item.imgSrc)} // Pass all image sources
                    currentIndex={currentMedia}
                    onClose={closeMediaViewer}
                    backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 3000 }} // Ensure high z-index
                    closeOnClickOutside={true} // Optional: close the viewer when clicking outside
                />
            ))}
        </div>
    );
}

export default ResultMultimedia;