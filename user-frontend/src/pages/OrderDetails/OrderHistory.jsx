import React from 'react';
import axios from '../../axios';
import './OrderHistory.css';
import { formatCurrency } from '../../utils/formatCurrency';

const OrderHistory = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('/order/order-history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Example of token from local storage
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order history');
        setLoading(false);
      }
    };
    
    fetchOrderHistory();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <h2>Order ID: {order.id}</h2>
              <p>Total Amount: {formatCurrency(order.total_price)}</p>
              <p>Order Status: {order.order_status}</p>
              <div className="order-details">
                <h3>Order Details:</h3>
                <ul>
                  {order.order_details.map((detail, index) => (
                    <li key={index}>
                      {detail.description}: {formatCurrency(detail.price)}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
