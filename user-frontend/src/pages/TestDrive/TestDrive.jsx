import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TestDrive.css';

const TestDrive = () => {
  const navigate = useNavigate();
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
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('customer/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
    if (selectedCar) {
      setCarInfo(selectedCar);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchShowrooms = async () => {
      try {
        const response = await axios.get('/showroom/list');
        setShowroomList(response.data);
      } catch (error) {
        console.error('Error fetching showrooms:', error);
      }
    };

    fetchShowrooms();
  }, []);

  const validateTestDriveDate = () => {
    const currentDate = new Date();
    if (!testDriveDate) return false;
    const selectedDate = new Date(testDriveDate);
    const differenceInTime = selectedDate.getTime() - currentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

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

    try {
      const response = await axios.post('/test-drive/request', {
        customer_id: customerData.id,
        car_id: carInfo.id,
        showroom_id: selectedShowroom,
        test_drive_date: testDriveDate,
      });
      setSuccess('Test drive request successfully submitted!');
      setError('');
      navigate('/test-drive/history');
    } catch (err) {
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
    }
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
          <input type="text" id="name" value={customerData.fullname} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={customerData.email} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={customerData.phone_number}
            disabled
          />
        </div>

        {/* Đặt Test Drive Date và Showroom trong một dòng */}
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

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default TestDrive;
