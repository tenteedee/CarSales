import React, { useEffect, useState } from 'react';
import axios from '../../axios'; // Adjust the import path as needed

const OrderList = ({ userId }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/orders/user/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div>
            <h2>Your Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            Order ID: {order.id}, Status: {order.order_status}
                            {/* Link to OrderDetail could be added here */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderList;