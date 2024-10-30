import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from './../../axios';
import './CostEstimate.css';
import formatCurrency from '../../utils/formatCurrency';

const CostEstimate = ({ price }) => {
  const { t, i18n } = useTranslation();
  const [fees, setFees] = useState({
    tax: 0,
    inpection_fee: 0,
    registration_fee: 0,
    road_usage_fee: 0,
  });
  const [mandatoryInsurance, setMandatoryInsurance] = useState(0);

  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('language') || 'en'
  );

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/settings');
        const { tax, inpection_fee, registration_fee, road_usage_fee } =
          response.data;
        setFees({
          tax: parseFloat(tax) || 0,
          inpection_fee: parseInt(inpection_fee, 10) || 0,
          registration_fee: parseInt(registration_fee, 10) || 0,
          road_usage_fee: parseInt(road_usage_fee, 10) || 0,
        });
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };

    const fetchInsurances = async () => {
      try {
        const response = await axios.get('/insurance/all');
        const mandatoryInsuranceData = response.data.find(
          (insurance) => insurance.type === 1
        );
        setMandatoryInsurance(
          mandatoryInsuranceData ? mandatoryInsuranceData.price : 0
        );
      } catch (error) {
        console.error('Failed to fetch insurances:', error);
      }
    };

    fetchInsurances();
    fetchSettings();
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

  const calculateTax = () => {
    return (price * fees.tax) / 100;
  };

  const totalCost = () => {
    return (
      price * 1 +
      calculateTax() +
      fees.inpection_fee * 1 +
      fees.registration_fee * 1 +
      fees.road_usage_fee * 1 +
      mandatoryInsurance * 1
    );
  };

  // console.log('Parsed fees:', fees);
  // console.log('price:', price);
  // console.log('totalCost:', totalCost());

  return (
    <div className="cost-estimate-container">
      <h2 className="cost-title">DỰ ĐOÁN CHI PHÍ XE LĂN BÁNH</h2>
      <p className="cost-subtitle">
        Giá dự đoán tạm tính theo khu vực Hà Nội và chưa chiết khấu theo CTKM
      </p>
      <div className="cost-details">
        <div className="cost-item">
          <strong>Giá xe:</strong> <span>{formatCurrency(price)}</span>
        </div>
        <hr />
        <div className="cost-item">
          <strong>Phí bắt buộc</strong>
        </div>
        <div className="cost-item">
          <span>Phí trước bạ:</span>{' '}
          <span>
            {fees?.tax}% - {formatCurrency(calculateTax())}
          </span>
        </div>
        <div className="cost-item">
          <span>Phí kiểm định:</span>{' '}
          <span>{formatCurrency(fees.inpection_fee)}</span>
        </div>
        <div className="cost-item">
          <span>Phí đăng ký:</span>{' '}
          <span>{formatCurrency(fees.registration_fee)}</span>
        </div>
        <div className="cost-item">
          <span>Phí sử dụng đường bộ (1 năm):</span>{' '}
          <span>{formatCurrency(fees.road_usage_fee)}</span>
        </div>
        <div className="cost-item">
          <span>Bảo hiểm TNDS:</span>{' '}
          <span>{formatCurrency(mandatoryInsurance)}</span>
        </div>
        <hr />
        <div className="cost-total">
          <strong>Tổng tiền:</strong> <span>{formatCurrency(totalCost())}</span>
        </div>
      </div>
    </div>
  );
};

export default CostEstimate;
