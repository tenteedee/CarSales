import Orders from '../../models/Orders.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id);
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
        const { cartItems } = req.body;

        // Tạo từng đơn hàng cho mỗi sản phẩm trong giỏ
        const newOrders = await Promise.all(
            cartItems.map(async (item) => {
                const order = await Orders.create({
                    customer_id: req.user.id,  // Giả sử đã có ID của người dùng đăng nhập
                    car_id: item.car_id,
                    showroom_id: item.showroom_id,
                    quantity: item.quantity,
                    total_price: item.total_price,
                    order_status: 'pending',
                });

                // Fetch the full order details including associated models (if needed)
                const fullOrder = await Orders.findByPk(order.id, {
                    include: [
                        {
                            model: Customer, // Giả sử bạn có liên kết đến mô hình Customer
                            attributes: ['id', 'name', 'email'] // Chọn thuộc tính nào cần thiết
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
    const [updated] = await Orders.update(req.body, {
      where: { id: req.params.id },
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
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};