import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import ChangePassword from './ChangePassword';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Profile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    date_of_birth: new Date(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('customer/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedData = response.data;
        setUserData({
          ...fetchedData,
          date_of_birth: fetchedData.date_of_birth ? new Date(fetchedData.date_of_birth) : new Date(),
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange = (date) => {
    setUserData((prevData) => ({
      ...prevData,
      date_of_birth: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'customer/profile/update',
        {
          phone_number: userData.phone_number,
          address: userData.address,
          date_of_birth: userData.date_of_birth.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSubmitting(false);
      setStatus(true);
      setMessage('Profile updated successfully!');
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      setIsSubmitting(false);
      setStatus(false);
      setMessage('Error updating profile!');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-info">
        <h1>User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name:</label>
            <input type="text" id="fullname" value={userData.fullname} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={userData.email} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              value={userData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={userData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <DatePicker
              selected={userData.date_of_birth}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
          </div>
          {status ? <p style={{ color: 'green' }}>{message}</p> : <p style={{ color: 'red' }}>{message}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
      <div className="password-section">
        <ChangePassword />
      </div>
    </div>
  );
};

export default UserProfile;
