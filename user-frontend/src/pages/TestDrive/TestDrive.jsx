import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TestDrive.css';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10,11}$/;

const TestDrive = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [carInfo, setCarInfo] = useState(null);
  const [customerData, setCustomerData] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [testDriveDate, setTestDriveDate] = useState(null);
  const [showroomList, setShowroomList] = useState([]);
  const [selectedShowroom, setSelectedShowroom] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token);
    }

    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
    if (selectedCar) {
      setCarInfo(selectedCar);
    } else {
      navigate('/');
    }

    fetchShowrooms();
  }, [navigate]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('customer/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomerData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchShowrooms = async () => {
    try {
      const response = await axios.get('/showroom/list');
      setShowroomList(response.data);
    } catch (error) {
      console.error('Error fetching showrooms:', error);
    }
  };

  const validateInputs = () => {
    if (!emailRegex.test(customerData.email)) {
      setError('Invalid email format.');
      return false;
    }
    if (!phoneRegex.test(customerData.phone_number)) {
      setError('Phone number must be 10 or 11 digits.');
      return false;
    }
    return true;
  };

  const validateTestDriveDate = () => {
    const currentDate = new Date();
    if (!testDriveDate) return false;
    const selectedDate = new Date(testDriveDate);
    const differenceInDays = (selectedDate - currentDate) / (1000 * 3600 * 24);
    return differenceInDays >= 2;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateTestDriveDate()) {
      setError('Test drive date must be at least 2 days from today.');
      return;
    }

    if (!selectedShowroom) {
      setError('Please select a showroom.');
      return;
    }

    if (!isLoggedIn && !validateInputs()) {
      return;
    }

    try {
      let requestPayload = {
        car_id: carInfo.id,
        test_drive_date: testDriveDate,
        showroom_id: selectedShowroom,
      };

      if (isLoggedIn) {
        requestPayload.customer_id = customerData.id;
      } else {
        requestPayload.customer_info = {
          fullname: customerData.fullname,
          email: customerData.email,
          phone_number: customerData.phone_number,
        };
      }

      const response = await axios.post('/test-drive/request', requestPayload);
      setSuccess('Test drive request successfully submitted!');
      setError('');
      navigate('/test-drive/success');
    } catch (err) {
      handleSubmissionError(err);
    }
  };

  const handleSubmissionError = (err) => {
    if (err.response) {
      if (err.response.status === 404) {
        setError('No sales staff available for the selected showroom.');
      } else if (err.response.status === 500) {
        setError('Internal server error.');
      }
    } else {
      setError('Something went wrong.');
    }
    setSuccess('');
  };

  return (
    <div className="test-drive-container">
      <h2>Request a Test Drive</h2>
      {carInfo && (
        <div className="car-details">
          <h1>
            {carInfo.brand.name} {carInfo.model}
          </h1>
          <img src={carInfo.images[0].image_url} alt={carInfo.model} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="test-drive-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            id="name"
            value={customerData.fullname}
            onChange={(e) =>
              setCustomerData({ ...customerData, fullname: e.target.value })
            }
            disabled={isLoggedIn}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={customerData.email}
            onChange={(e) =>
              setCustomerData({ ...customerData, email: e.target.value })
            }
            disabled={isLoggedIn}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={customerData.phone_number}
            onChange={(e) =>
              setCustomerData({ ...customerData, phone_number: e.target.value })
            }
            disabled={isLoggedIn}
          />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="testDriveDate">Test Drive Date</label>
            <DatePicker
              selected={testDriveDate}
              onChange={(date) => setTestDriveDate(date)}
              minDate={new Date()}
              className="form-control"
              placeholderText="Select a test drive date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="form-group half-width">
            <label htmlFor="showroom">Select Showroom</label>
            <select
              id="showroom"
              value={selectedShowroom}
              onChange={(e) => setSelectedShowroom(e.target.value)}
              required
            >
              <option value="">Select a showroom</option>
              {showroomList.map((showroom) => (
                <option key={showroom.id} value={showroom.id}>
                  {showroom.name} - {showroom.address}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" style={{ fontSize: '16px' }}>
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default TestDrive;
