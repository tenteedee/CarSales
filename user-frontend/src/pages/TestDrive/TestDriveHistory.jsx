import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from '../../axios';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const getCustomerIdFromToken = () => {
  const token = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  return decodedToken.id;
};

export default function ShowHistoryPage() {
  const [filter, setFilter] = useState('all');
  const [customerData, setCustomerData] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesStaffs, setSalesStaffs] = useState([]);

  useEffect(() => {
    const fetchShowrooms = async () => {
      try {
        const response = await axios.get('/showroom/list');
        setShowrooms(response.data); // Lưu danh sách showroom
      } catch (error) {
        console.error('Error fetching showrooms:', error);
      }
    };

    const fetchCustomerData = async () => {
      try {
        const customerId = getCustomerIdFromToken();
        const response = await axios.get(
          `test-drive/view?customer=${customerId}`
        );
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching test drive history:', error);
      }
    };

    const fetchSalesStaff = async () => {
      try {
        const response = await axios.get('/staff/list');
        console.log(response.data)
        setSalesStaffs(response.data);
      } catch (error) {
        console.error('Error fetching sales staff:', error);
      }
    };

    fetchShowrooms();
    fetchCustomerData();
    fetchSalesStaff();

    console.log(salesStaffs)
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = customerData.filter((item) => {
    const itemDate = moment(item.test_drive_date);

    const dateMatch =
      (!startDate || itemDate.isSameOrAfter(moment(startDate))) &&
      (!endDate || itemDate.isSameOrBefore(moment(endDate)));

    const statusMatch = filter === 'all' || item.status === filter;

    return statusMatch && dateMatch;
  });

  const findShowroomById = (showroomId) => {
    return showrooms.find((showroom) => showroom.id === showroomId);
  };

  const findSalesStaffById = (salesStaffId) => {
  if (!Array.isArray(salesStaffs)) {
    console.error('salesStaffs is not an array:', salesStaffs);
    return 'N/A';
  }

  const staff = salesStaffs.find((staff) => staff.id === salesStaffId);
  return staff ? staff.fullname : 'N/A';
};

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
              <th>Showroom Name</th>
              <th>Showroom Address</th> {/* Hiển thị địa chỉ showroom */}
              <th>Status</th>
              <th>Sales Staff</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => {
              const showroom = findShowroomById(item.showroom_id);
              return (
                <tr key={index}>
                  <td>{item.car.brand.name}</td>
                  <td>{item.car.model}</td>
                  <td>{item.car.type.name}</td>
                  <td>{new Date(item.test_drive_date).toLocaleDateString()}</td>
                  <td>{showroom ? showroom.name : 'N/A'}</td>
                  <td>{showroom ? showroom.address : 'N/A'}</td>
                  <td>
                    <span
                      className={`badge ${getStatusBadgeClass(item.status)}`}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  </td>
                  <td>{findSalesStaffById(item.sales_staff_id)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
