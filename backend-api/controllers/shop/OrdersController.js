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
      const { cartItems } = req.body;

      // Tạo từng đơn hàng cho mỗi sản phẩm trong giỏ
      const newOrders = await Promise.all(
          cartItems.map(async (item) => {
              const order = await Orders.create({
                  customer_id: req.user.id, 
                  car_id: item.car_id,
                  showroom_id: item.showroom_id,
                  quantity: item.quantity,
                  total_price: item.total_price,
                  order_status: 'pending',
              });

              const fullOrder = await Orders.findByPk(order.id, {
                  include: [
                      {
                          model: Customer,
                          attributes: ['id', 'name', 'email'] 
                      },
                      // Có thể thêm các model khác như Car, Showroom, v.v. nếu cần
                  ],
              });

              return fullOrder;
          })
      );

      res.status(201).json({ message: 'Order created successfully!', orders: newOrders });
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

