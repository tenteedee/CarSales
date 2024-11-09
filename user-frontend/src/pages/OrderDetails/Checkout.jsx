import React, { useState } from 'react';
import axios from '../../axios'; // Adjust the import path as needed

const Checkout = ({ userId }) => {
  const [carId, setCarId] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const orderData = {
        customerId: userId,
        car_id: carId,
        color: color,
        quantity: quantity,
        order_status: 'pending',
      };
      const response = await axios.post('/order/create', orderData);
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Car ID:
        <input
          type="text"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
        />
      </label>
      <label>
        Color:
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        />
      </label>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default Checkout;