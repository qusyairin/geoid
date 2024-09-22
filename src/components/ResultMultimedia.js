import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import "../style.css";
import ImageViewer from 'react-simple-image-viewer';
import VideoViewer from './modal/VideoViewer';

function ResultMultimedia({ category, keyword }) {
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
                setMultimediaItems(response.data);
                setFilteredMultimedia(response.data); // Initialize filtered items
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching multimedia data:', error);
                setLoading(false); // Set loading to false if an error occurs
            }
        };

        fetchMultimedia();
    }, []);

    useEffect(() => {
        const categoryFilter = category ? category.toLowerCase() : '';
        const keywordFilter = keyword ? keyword.toLowerCase() : '';

        let filtered = multimediaItems;

        if (categoryFilter) {
            filtered = filtered.filter(multimedia => multimedia.category.toLowerCase() === categoryFilter);
        }

        if (keywordFilter) {
            filtered = filtered.filter(multimedia =>
                multimedia.name.toLowerCase().includes(keywordFilter) ||
                multimedia.location.toLowerCase().includes(keywordFilter) ||
                multimedia.category.toLowerCase().includes(keywordFilter)
            );
        }

        setFilteredMultimedia(filtered);
    }, [category, keyword, multimediaItems]); // Add multimediaItems to the dependency array

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
        <div className="artifacts-result-page">
            <h1 style={{ textAlign: 'left' }}>
                Multimedia: {resultCount} result{resultCount !== 1 ? 's' : ''} found
            </h1>
            <div className="artifacts-grid">
                {resultCount === 0 ? (
                    <p>No multimedia found.</p>
                ) : (
                    filteredMultimedia.map((item, index) => (
                        <div className="artifact-card" key={item._id} onClick={() => openMediaViewer(index)}>
                            {item.type === "image" ? (
                                <img src={item.imgSrc} alt={item.name} className="artifact-image" />
                            ) : (
                                <video className="artifact-image" src={item.imgSrc} alt={item.name} />
                            )}
                            <div className="artifact-info">
                                <h3>{item.name}</h3>
                                <p>{item.location}</p>
                                <button className="view-button">
                                    View Media >
                                </button>
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