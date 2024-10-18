import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const OrderDetailsPage = ({ match }) => {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/orders/${match.params.orderId}`);
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [match.params.orderId]);

    return (
        <div>
            {orderDetails ? (
                <div>
                    <h1>Order Details</h1>
                    <p>Order ID: {orderDetails.id}</p>
                    <p>Total Price: {orderDetails.total_price}</p>
                    {/* Display other order details */}
                </div>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    );
};

export default OrderDetailsPage;