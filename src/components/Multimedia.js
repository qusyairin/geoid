import React, { useState, useCallback } from 'react';
import "../style.css";
import artifacts1 from '../assets/media1.jpg';
import artifacts2 from '../assets/media2.jpg';
import artifacts3 from '../assets/media3.jpg';
import artifacts4 from '../assets/media4.jpg';
import video1 from '../assets/video1.mov'; // Add your video asset
import ImageViewer from 'react-simple-image-viewer';
import VideoViewer from './modal/VideoViewer';

function Multimedia() {
    const [currentMedia, setCurrentMedia] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isVideo, setIsVideo] = useState(false);

    const multimedia = [
        {
            name: "Kebun 500",
            location: "Alor Setar, Kedah",
            imgSrc: artifacts1,
            type: "image", // Specify type
            link: "#",
            category: "Geology"
        },
        {
            name: "Kebun 500 Video",
            location: "Malaysia",
            imgSrc: video1,
            type: "video", // Specify type
            link: "#",
            category: "Geology"
        },
        {
            name: "Artifacts in Pulau Bidong Shipwreck",
            location: "Pulau Bidong, Kuala Terengganu",
            imgSrc: artifacts2,
            type: "image", // Specify type
            link: "#",
            category: "Archaeology"
        },
        {
            name: "Artifacts in Pulau Bidong Shipwreck",
            location: "Pulau Bidong, Kuala Terengganu",
            imgSrc: artifacts3,
            type: "image", // Specify type
            link: "#",
            category: "Archaeology"
        },
        {
            name: "Artifacts in Pulau Bidong Shipwreck",
            location: "Pulau Bidong, Kuala Terengganu",
            imgSrc: artifacts4,
            type: "image", // Specify type
            link: "#",
            category: "Archaeology"
        },
    ];

    const openMediaViewer = useCallback((index) => {
        const media = multimedia[index];
        setCurrentMedia(index);
        setIsVideo(media.type === "video");
        setIsViewerOpen(true);
    }, [multimedia]);

    const closeMediaViewer = () => {
        setIsViewerOpen(false);
    };

    return (
        <div className="report-page">
            <h1>Multimedia</h1>
            <div className="search-container">
                <input type="text" placeholder="Search Multimedia" className="search-bar" />
                <button className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
            <div className="artifacts-grid">
                {multimedia.map((item, index) => (
                    <div className="artifact-card" key={index} onClick={() => openMediaViewer(index)}>
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
                    src={multimedia[currentMedia].imgSrc} // Pass video source
                    onClose={closeMediaViewer}
                />
            ) : (
                <ImageViewer
                    src={multimedia.map(item => item.imgSrc)} // Pass all image sources
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
