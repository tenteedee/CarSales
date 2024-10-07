import React from 'react';

const CarLoan90sButton = ({ children, onClick }) => {
    return (
        <button className="btn-90s apply-loan-button" onClick={onClick}>
            <span className="btn-90s-text">{children}</span>
        </button>
    );
};

export default CarLoan90sButton;