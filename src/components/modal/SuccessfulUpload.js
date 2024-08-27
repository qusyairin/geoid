import React from 'react';
import '../../modal.css';
import success from '../../assets/success.png'

function SuccessfulUpload({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={success} style={{width: '30%'}}></img>
        <p>{message}</p>
        <button onClick={onClose} className="modal-close-button">OK</button>
      </div>
    </div>
  );
}

export default SuccessfulUpload;
