import React, { useState, useCallback } from 'react';
import "../style.css";
import artifacts1 from '../assets/media1.jpg';
import artifacts2 from '../assets/media2.jpg';
import video1 from '../assets/video1.mov'; // Add your video asset
import ImageViewer from 'react-simple-image-viewer';
import VideoViewer from './modal/VideoViewer';

function ResultMultimedia() {
    const [currentMedia, setCurrentMedia] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isVideo, setIsVideo] = useState(false);

    const multimedia = [
        {
            name: "Kebun 500",
            location: "Alor Setar, Kedah",
            imgSrc: artifacts1,
            type: "image", // Specify type
            link: "#"
        },
        {
            name: "Tusan Cliff",
            location: "Miri, Sarawak",
            imgSrc: artifacts2,
            type: "image", // Specify type
            link: "#"
        },
        {
            name: "Kebun 500 Video",
            location: "Malaysia",
            imgSrc: video1,
            type: "video", // Specify type
            link: "#"
        },
        // ... add more multimedia here
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

    const resultCount = multimedia.length;

    return (
        <div className="artifacts-result-page">
            <h1 style={{ textAlign: 'left' }}>
                Multimedia: {resultCount} result{resultCount !== 1 ? 's' : ''} found
            </h1>
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

export default ResultMultimedia;
