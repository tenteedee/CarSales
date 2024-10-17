import Orders from '../../models/Orders.js';
import OrderDetails from '../../models/OrderDetails.js';
import CarColors from '../../models/CarColors.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.findAll({
            include: ['orderDetails', 'car']
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Orders.findByPk(req.params.id, {
            include: ['orderDetails', 'car']
        });
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createOrder = async (req, res) => {
    try {
        const newOrder = await Orders.create(req.body);
        // Assuming you have a route to handle confirmation page in your frontend
        res.status(201).json({ newOrder, message: 'Order placed successfully', redirect: '/order-confirmation/' + newOrder.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const updated = await Orders.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedOrder = await Orders.findByPk(req.params.id);
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deleted = await Orders.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send("Order deleted");
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getOrderConfirmation = async (req, res) => {
    try {
        const order = await Orders.findByPk(req.params.id, {
            include: [{ model: OrderDetails, as: 'orderDetails' }, { model: Car, as: 'car' }]
        });
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};