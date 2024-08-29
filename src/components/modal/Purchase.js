import React from 'react';
import '../../purchase.css';

const Purchase = ({ show, onClose, report }) => {
    if (!show) return null;

    const handlePurchaseNow = () => {
        // Trigger the download of the PDF file
        const link = document.createElement('a');
        link.href = report.file;
        link.download = report.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose(); // Close the modal after download
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Close Button */}
                <button className="modal-close-button-purchase" onClick={onClose}>
                    &times;
                </button>
                <h2>{report.title}</h2>
                <p>Author: {report.author}</p>
                <p>Year: {report.year}</p>
                <p><strong>Price: RM 5</strong></p>
                <button onClick={handlePurchaseNow} className="purchase-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                        <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                        <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
                    </svg>&nbsp;
                    Purchase Now
                </button>
            </div>
        </div>
    );
};

export default Purchase;