import React from 'react';
import '../../video.css';

function VideoViewer({ src, onClose }) {
    return (
        <div className="video-viewer">
            <div className="video-viewer-content">
                <button className="close-button" onClick={onClose}>×</button>
                <video className="video-player" controls>
                    <source src={src} type="video/mp4" />
                    <source src={src} type="video/quicktime" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default VideoViewer;