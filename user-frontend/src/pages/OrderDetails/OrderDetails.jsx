import React, { useEffect, useState } from 'react';
import axios from '../../axios'; // Adjust the import path as needed

const OrderDetail = ({ orderId }) => {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/order/details/${orderId}`);
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    return (
        <div>
            <h2>Order Details</h2>
            {orderDetails ? (
                <div>
                    <p>Order ID: {orderDetails.id}</p>
                    <p>Status: {orderDetails.order_status}</p>
                    <p>Total Price: {orderDetails.total_price}</p>
                    {/* Additional details can be added here */}
                </div>
            ) : (
                <p>No details available for this order.</p>
            )}
        </div>
    );
};

export default OrderDetail;