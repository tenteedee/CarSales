import Orders from '../../models/Orders.js';
import OrderDetails from '../../models/OrderDetails.js';


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [{
        model: OrderDetails,
        as: 'order_details'
      }]
    });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found!' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (isNaN(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }
    const order = await Orders.findByPk(orderId, {
      include: [{
        model: OrderDetails,
        as: 'order_details'
      }]
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customer_id, total_price, order_status, order_details } = req.body;
    const newOrder = await Orders.create({
      customer_id,
      total_price,
      order_status
    });
    if (order_details && order_details.length > 0) {
      await OrderDetails.bulkCreate(
        order_details.map(detail => ({
          ...detail,
          order_id: newOrder.id
        }))
      );
    }
    res.status(201).json({ message: 'Order created successfully!', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { total_price, order_status } = req.body;
    const order = await Orders.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.total_price = total_price || order.total_price;
    order.order_status = order_status || order.order_status;
    await order.save();
    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Orders.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

