import React, { useState, useEffect } from 'react';
import axios from './../../axios';
import './InsuranceList.css';

const InsuranceList = () => {
  const [insurances, setInsurances] = useState([]);
  const [selectedType, setSelectedType] = useState('Bắt buộc');
  const [insuranceTypes, setInsuranceTypes] = useState([]);

  useEffect(() => {
    // Fetch insurances from the API
    axios
      .get('/insurance/all')
      .then((response) => {
        const data = response.data;
        setInsurances(data);

        // Get unique insurance types for the menu
        const types = [...new Set(data.map((item) => item.type))];
        setInsuranceTypes(types);
      })
      .catch((error) => console.error('Error fetching insurances:', error));
  }, []);

  // Filter insurances based on selected type
  const filteredInsurances = insurances.filter(
    (insurance) => insurance.type === selectedType
  );

  // Function to calculate reference price range for type_price = 2
  const getReferencePriceRange = (insurance) => {
    if (insurance.type_price === 2) {
      const minPrice = 200000000 * (insurance.price / 100); // 200 million * percentage
      const maxPrice = 2000000000 * (insurance.price / 100); // 2 billion * percentage
      return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;
    }
    return formatCurrency(insurance.price);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <div className="insurance-list-container">
      {/* Left-side menu */}
      <div className="insurance-menu">
        <h3>Loại Bảo Hiểm</h3>
        {insuranceTypes.map((type) => (
          <button
            key={type}
            className={`menu-item ${type === selectedType ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div className="insurance-details">
        <h2>Gói Bảo Hiểm - {selectedType}</h2>
        <div className="insurance-cards">
          {filteredInsurances.map((insurance) => (
            <div key={insurance.id} className="insurance-card">
              <h3>{insurance.name}</h3>
              <p>{insurance.description}</p>
              <p>
                <strong>Giá tham khảo:</strong>{' '}
                {getReferencePriceRange(insurance)}
              </p>
              <div className="provider-info">
                <p>
                  <strong>Nhà cung cấp:</strong> {insurance.provider.name}
                </p>
                <p>
                  <strong>Phone:</strong> {insurance.provider.phone_number}
                </p>
                <p>
                  <strong>Email:</strong> {insurance.provider.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceList;
