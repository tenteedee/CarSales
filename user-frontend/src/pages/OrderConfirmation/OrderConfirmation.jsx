import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../axios';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/order/${orderId}`);
                setOrder(response.data);
            } catch (err) {
                setError('Failed to fetch order details');
                console.error('Error fetching order details:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="order-confirmation">
            <h1>Order Confirmation</h1>
            {order ? (
                <div>
                    <p>Thank you for your order, {order.customerName}!</p>
                    <p>Your order ID is {order.id}.</p>
                    <p>Status: {order.status}</p>
                    <p>Total: ${order.total}</p>
                    <Link to="/">Return to Home</Link>
                </div>
            ) : (
                <p>Order not found.</p>
            )}
        </div>
    );
};

export default OrderConfirmation;