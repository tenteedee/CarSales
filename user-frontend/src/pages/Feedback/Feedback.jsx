import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Feedback.css';

const getCustomerIdFromToken = () => {
  const token = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  return decodedToken.id;
};

const Feedback = () => {
  const { carId } = useParams(); // Get carId from URL
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
  }, [carId, navigate]);

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
      const response = await axios.post('/api/shop/feedback/create', {
        customer_id: customerData.id,
        car_id: carInfo.id,
        rating: rating,
        content: content,
      });

      setSuccess('Feedback submitted successfully!');
      setError('');
      setContent('');
      setRating(0);
      navigate('/feedback/success');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Feedback</h2>
      {carInfo && (
        <div className="car-details">
          <h1>
            {carInfo.brand.name} {carInfo.model}
          </h1>
          <img src={carInfo.images[0].image_url} alt={carInfo.model} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="feedback-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label>Customer Name</label>
          <input type="text" value={customerData.fullname} disabled />
        </div>

        <div className="form-group rating-group">
          <label>Rating</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star ${value <= rating ? 'selected' : ''}`}
                onClick={() => handleRatingClick(value)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="form-group content-group">
          <label htmlFor="content">Feedback Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your feedback here"
            rows="4"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
