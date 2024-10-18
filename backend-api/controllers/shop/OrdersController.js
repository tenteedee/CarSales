import Orders from '../../models/Orders.js';
import OrderDetails from '../../models/OrderDetails.js';
import CarColors from '../../models/CarColors.js';



export const getAllOrder = async (req, res) => {
    try {
        const order = await Orders.findAll({
            include: ['orderDetails', 'car']
        });
        res.status(200).json(order);
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
    const { customerId, showroomId, carId, quantity } = req.body;

    try {
        const order = await Orders.create({
            customer_id: customerId,
            showroom_id: showroomId, // This is now optional
            car_id: carId,
            quantity: quantity
        });
        res.status(200).json({ success: true, orderId: order.id });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Order creation failed', error });
    }
};
export const updateOrder = async (req, res) => {
    const { showroomId } = req.body; // Assuming only showroomId might be updated for simplicity
    try {
        const updated = await Orders.update({ showroom_id: showroomId }, {
            where: { id: req.params.id }
        });
        if (updated[0] > 0) { // Check if any rows were updated
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
        const deleted = await Order.destroy({
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
