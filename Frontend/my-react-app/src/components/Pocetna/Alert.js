import React from 'react';
import './Alert.css';

const Alert = ({ message, onClose }) => {
    
    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <p className="message">{message}</p>
                    <button className="ok-button" onClick={handleClose}>Ok</button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
