import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from '../../axios';
import 'react-datepicker/dist/react-datepicker.css';

const getCustomerIdFromToken = () => {
  const token = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  return decodedToken.id;
};

export default function ShowHistoryPage() {
  const [filter, setFilter] = useState('all');
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerId = getCustomerIdFromToken();
        const response = await axios.get(
          `/test-drive/view?customer=${customerId}`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchStaffs = async () => {
      try {
        const response = await axios.get('/staff/all');
        console.log(response.data);
        setStaffs(response.data);
      } catch (error) {
        console.error('Error fetching staffs:', error);
      }
    };

    fetchData();
    fetchStaffs();
  }, []);

  const getStaffName = (staffId) => {
    const staff = staffs.find((s) => s.id === staffId);
    return staff ? staff.fullname : 'Unknown';
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.testDriveDate);
    const statusMatch = filter === 'all' || item.status === filter;
    const dateMatch =
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate);
    return statusMatch && dateMatch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'approved':
        return 'bg-primary';
      case 'pending':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Show History</h1>
      <div className="row mb-3">
        <div className="d-flex justify-content-between">
          <div className="col-md-3">
            <label className="form-label">Filter by Status:</label>
            <select
              id="status-filter"
              className="form-select"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover text-lg">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Type</th>
              <th>Test Drive Date</th>
              <th>Status</th>
              <th>Sales Staff</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.car.brand.name}</td>
                <td>{item.car.model}</td>
                <td>{item.car.type.name}</td>
                <td>{new Date(item.test_drive_date).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td>{getStaffName(item.sales_staff_id) || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
