// FeedbackList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import './FeedbackList.css';

const FeedbackList = ({ carId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`/feedback/car/${carId}`);
        console.log('Feedbacks:', response.data.feedbacks);
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setError('Unable to load feedbacks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, [carId]);

  if (isLoading) return <p>Loading feedback...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="feedback-list">
      <h3>Customer Feedback</h3>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div key={feedback.id} className="feedback-item">
            <div className="feedback-header">
              <strong>{feedback.customer.fullname}</strong>
              <span className="rating">
                {Array.from({ length: feedback.rating }, (_, index) => (
                  <span key={index}>★</span>
                ))}
              </span>
            </div>
            <p className="content">{feedback.content}</p>
          </div>
        ))
      ) : (
        <p>No feedback available for this car.</p>
      )}
    </div>
  );
};

export default FeedbackList;