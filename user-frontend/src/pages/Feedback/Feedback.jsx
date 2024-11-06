import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Feedback.css';

const getCustomerIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  return decodedToken.id;
};

const Feedback = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [carInfo, setCarInfo] = useState(null);
  const [customerData, setCustomerData] = useState({});
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const customerId = getCustomerIdFromToken();
      if (!customerId) return;
      try {
        const response = await axios.get('customer/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchCarInfo = async () => {
      try {
        const response = await axios.get(`/car/detail/${carId}`);
        setCarInfo(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchUserProfile();
    fetchCarInfo();
  }, [carId]);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }

    if (content.trim() === '') {
      setError('Please enter feedback content.');
      return;
    }

    try {
      await axios.post('/feedback/create', {
        customer_id: customerData.id,
        car_id: carId,
        rating,
        content,
      });

      setSuccess('Feedback submitted successfully!');
      setError('');
      setContent('');
      setRating(0);
      navigate('/test-drive/history');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-image">
        <img
          src={carInfo?.images?.[0]?.image_url}
          alt={`${carInfo?.brand?.name} ${carInfo?.model}`}
        />
      </div>

      <div className="feedback-form">
        <h2>Submit Feedback</h2>
        <div className="brand-model">
          <div>
            {carInfo?.brand?.name} {carInfo?.model}
          </div>
        </div>

        <label htmlFor="customerName">Customer Name</label>
        <input
          type="text"
          id="customerName"
          value={customerData.name || 'Tran Tien Duc'}
          readOnly
        />

        <label htmlFor="rating">Rating</label>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRatingClick(star)}
              style={{
                cursor: 'pointer',
                color: star <= rating ? '#FFD700' : '#ccc',
              }}
            >
              ★
            </span>
          ))}
        </div>

        <label htmlFor="feedbackContent">Feedback Content</label>
        <textarea
          id="feedbackContent"
          placeholder="Enter your feedback here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" onClick={handleSubmit}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
