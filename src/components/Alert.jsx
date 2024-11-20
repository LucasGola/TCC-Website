// src/components/Alert.jsx
import React from 'react';
import './Alert.css';

const Alert = ({ message, onClose }) => {
    return (
        <div className="alert-container">
            <div className="alert-message">
                {message}
                <button className="alert-close" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default Alert;
