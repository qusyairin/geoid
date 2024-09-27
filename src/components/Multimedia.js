import React, { useState, useEffect, useCallback } from 'react';
import "../style.css";
import ImageViewer from 'react-simple-image-viewer';
import VideoViewer from './modal/VideoViewer';
import axios from 'axios';

function Multimedia() {
    const [mediaItems, setMediaItems] = useState([]);
    const [filteredMediaItems, setFilteredMediaItems] = useState([]);
    const [currentMedia, setCurrentMedia] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [searchKeyword, setSearchKeyword] = useState(""); // Search keyword state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading
                const response = await axios.get('https://geoid-rest.vercel.app/media');
                const publicMedia = response.data.filter(media => media.access === 'public');
                setMediaItems(publicMedia);
                setFilteredMediaItems(publicMedia); // Initialize filtered items
            } catch (error) {
                console.error('Error fetching multimedia data:', error);
            } finally {
                setLoading(false); // Stop loading after data is fetched
            }
        };

        fetchData();
    }, []);

    const openMediaViewer = useCallback((index) => {
        const media = filteredMediaItems[index]; // Use filtered items for viewer
        setCurrentMedia(index);
        setIsVideo(media.type === "video");
        setIsViewerOpen(true);
    }, [filteredMediaItems]);

    const closeMediaViewer = () => {
        setIsViewerOpen(false);
    };

    // Handle search
    const handleSearch = (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        setSearchKeyword(keyword);

        const filtered = mediaItems.filter(item =>
            item.name.toLowerCase().includes(keyword) ||
            item.location.toLowerCase().includes(keyword) ||
            item.category.toLowerCase().includes(keyword)
        );
        setFilteredMediaItems(filtered);
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <p>Loading data...</p>
            </div>
        );
    }

    return (
        <div className="report-page">
            <h1>Multimedia</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search name, location, category..."
                    className="search-bar"
                    value={searchKeyword}
                    onChange={handleSearch}
                />
                <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
            <div className="artifacts-grid">
                {filteredMediaItems.map((item, index) => (
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
                ))}
            </div>

            {isViewerOpen && (isVideo ? (
                <VideoViewer
                    src={mediaItems[currentMedia].imgSrc} // Pass video source
                    onClose={closeMediaViewer}
                />
            ) : (
                <ImageViewer
                    src={filteredMediaItems.map(item => item.imgSrc)} // Pass all image sources
                    currentIndex={currentMedia}
                    onClose={closeMediaViewer}
                    backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 3000 }} // Ensure high z-index
                    closeOnClickOutside={true} // Optional: close the viewer when clicking outside
                />
            ))}
        </div>
    );
}

export default Multimedia;