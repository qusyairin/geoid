// src/components/Modal.js
import React from 'react';
import '../../viewMedia.css';

const ViewMedia = ({ isOpen, imageSrc, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <img src={imageSrc} alt="Enlarged view" className="modal-image" />
            </div>
        </div>
    );
};

export default ViewMedia;
