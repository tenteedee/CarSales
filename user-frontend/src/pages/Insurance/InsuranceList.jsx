import React, { useState, useEffect } from 'react';
import axios from './../../axios';
import './InsuranceList.css';
import { useTranslation } from 'react-i18next';
import formatCurrency from './../../utils/formatCurrency';

const InsuranceList = () => {
  const { t, i18n } = useTranslation();
  const [insurances, setInsurances] = useState([]);
  const [selectedType, setSelectedType] = useState(1);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('language') || 'en'
  );

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

  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem('language') || 'en';
      setCurrentLang(savedLanguage);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

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

  const getInsuranceName = (insurance) => {
    if (insurance === 1) {
      return `Bắt buộc`;
    } else if (insurance === 2) {
      return `Thân vỏ`;
    }
    return insurance.name;
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
            {getInsuranceName(type)}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div className="insurance-details">
        <h2>Gói Bảo Hiểm - {getInsuranceName(selectedType)}</h2>
        <div className="insurance-cards">
          {filteredInsurances.map((insurance) => (
            <div key={insurance.id} className="insurance-card">
              <h3>{insurance.name}</h3>
              <p>{insurance.description}</p>
              <p>
                <strong>Giá tham khảo:</strong> <br />
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
