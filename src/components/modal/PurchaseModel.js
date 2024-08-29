import React from 'react';
import '../../purchase.css';

const PurchaseModel = ({ show, onClose, model }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Close Button */}
                <button className="modal-close-button-purchase" onClick={onClose}>
                    &times;
                </button>
                <h2>{model.title}</h2>
                <p>Age: {model.age}</p>
                <p>Location: {model.origin}</p>
                <p><strong>Price: RM 100</strong></p>
                <a href={model.downloadPath} download style={{textDecoration: 'none'}}>
                    <button className="purchase-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                            <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
                        </svg>&nbsp;
                        Purchase Now
                    </button>
                </a>
            </div>
        </div>
    );
};

export default PurchaseModel;