import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TestDriveSuccess.css';

const TestDriveSuccess = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewHistory = () => {
    navigate('/test-drive/history');
  };

  return (
    <div className="test-drive-success-container">
      <h2>Test Drive Request Successful!</h2>
      <p>
        Your test drive request has been submitted successfully. A
        representative will contact you soon to confirm the details.
      </p>

      <div className="success-actions">
        <button onClick={handleBackToHome}>Back to Home</button>
        {token && (
          <button onClick={handleViewHistory}>View Test Drive History</button>
        )}
      </div>
    </div>
  );
};

export default TestDriveSuccess;
