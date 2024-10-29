import React, {useState, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import './OrderConfirmation.css';
import { formatCurrency } from '../../utils/priceFormat';


const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/order/details/${orderId}`);
        setOrderDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

 

  return (
    <div className="order-confirmation">
      <div className="checkmark-icon">
        <i className="fa fa-check-circle"></i>
      </div>
      <h1>Order Placed Successfully!</h1>
      <div className="order-details">
        <p>Your order ID is: {orderDetails.id}</p>
        <p>Total Amount: {formatCurrency(orderDetails.total_price)}</p>
      </div>
      <p>Thank you for shopping with us!</p>
    </div>
  );
};

export default OrderConfirmation;
