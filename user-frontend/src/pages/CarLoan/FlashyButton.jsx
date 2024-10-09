import React from 'react';
import './FlashyButton.css';

const FlashyButton = ({ onClick, children }) => {
    return (
        <button className="flashy-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default FlashyButton;