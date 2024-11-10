import OrderDetails from '../../models/OrderDetails.js';

export const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        if (isNaN(orderId)) {
            return res.status(400).json({ error: 'Invalid order ID' });
        }
        const orderDetails = await OrderDetails.findAll({
            where: { order_id: orderId }
        });
        if (!orderDetails || orderDetails.length === 0) {
            return res.status(404).json({ message: 'No order details found for this order' });
        }
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createOrderDetail = async (req, res) => {
    try {
        const { order_id,  price, color_id } = req.body;
        if (!order_id || isNaN(order_id)) {
            return res.status(400).json({ error: 'Invalid or missing order ID' });
        }
        const newOrderDetail = await OrderDetails.create({
            order_id,
            
            price,
            color_id
        });
        res.status(201).json({ message: 'Order detail added successfully!', orderDetail: newOrderDetail });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};