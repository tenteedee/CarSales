import Orders from "../../models/Orders.js";
import OrderDetails from "../../models/OrderDetails.js";
import { getRandomStaffByRole, getSetting } from "../../helper/Utils.js";
import Insurance from "../../models/Insurance.js";
import Car from "../../models/Car.js";
import Staff from "../../models/Staff.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [
        {
          model: OrderDetails,
          as: "order_details",
        },
      ],
    });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found!" });
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
      return res.status(400).json({ error: "Invalid order ID" });
    }
    const order = await Orders.findByPk(orderId, {
      include: [
        {
          model: OrderDetails,
          as: "order_details",
        },
      ],
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { car_id, showroom_id, insurance } = req.body;
    if (!car_id || !showroom_id) {
      return res.status(404).json({ message: "Order not found" });
    }
    let quantity = 1;

    const road_usage_fee =
      parseInt(await getSetting("road_usage_fee"), 10) || 0;
    const inpection_fee = parseInt(await getSetting("inpection_fee"), 10) || 0;
    const registration_fee =
      parseInt(await getSetting("registration_fee"), 10) || 0;
    const tax = parseFloat(await getSetting("tax")) || 0.0;
    if (
      road_usage_fee === 0 ||
      inpection_fee === 0 ||
      registration_fee === 0 ||
      tax === 0.0
    ) {
      return res.status(404).json({ message: "Config for system is missing" });
    }

    const mandatoryInsurance = await Insurance.findOne({
      where: { type: 1 },
      attributes: ["price"],
    });

    if (!mandatoryInsurance) {
      return res.status(404).json({ message: "Config for system is missing" });
    }
    const mandatoryInsurancePrice = mandatoryInsurance.price;
    const car = await Car.findOne({
      where: { id: car_id },
    });
    if (!car) {
      return res.status(404).json({ message: "Can not find car" });
    }
    let bodyInsuranceFee = 0;
    let bodyInsurance = null;
    if (insurance) {
      bodyInsurance = await Insurance.findOne({
        where: { id: insurance },
      });
      if (!bodyInsurance) {
        return res.status(404).json({ message: "Can not body insurance " });
      }
    }

    if (bodyInsurance != null) {
      if (bodyInsurance.type_price == 2) {
        bodyInsuranceFee = (car.price * bodyInsurance.price) / 100;
      } else {
        bodyInsuranceFee = bodyInsurance.price;
      }
    }
    let taxPrice = (car.price * tax) / 100;
    const total_price =
      car.price * 1 +
      taxPrice + // thuế trước bạ
      inpection_fee * 1 +
      registration_fee * 1 +
      road_usage_fee * 1 +
      bodyInsuranceFee +
      mandatoryInsurancePrice * 1;
    let sales_staff_id = null;
    const sales_staff = await getRandomStaffByRole(2);
    if (sales_staff) {
      sales_staff_id = sales_staff.id;
    }

    let technical_staff_id = null;
    const technical_staff = await getRandomStaffByRole(1);
    if (technical_staff) {
      technical_staff_id = technical_staff.id;
    }

    let insurance_staff_id = null;
    const insurance_staff = await getRandomStaffByRole(3);
    if (insurance_staff) {
      insurance_staff_id = insurance_staff.id;
    }
    const newOrder = await Orders.create({
      customer_id: req.user.id,
      insurance_staff_id,
      technical_staff_id,
      sales_staff_id,
      car_id,
      quantity,
      showroom_id,
      order_status: "pending",
      total_price,
      payment_price: total_price,
    });
    await OrderDetails.create({
      description: "Giá xe",
      order_id: newOrder.id,
      price: car.price,
    });
    await OrderDetails.create({
      description: "Phí kiểm định",
      order_id: newOrder.id,
      price: inpection_fee,
    });
    await OrderDetails.create({
      description: "Phí đăng ký",
      order_id: newOrder.id,
      price: registration_fee,
    });
    await OrderDetails.create({
      description: "Phí sử dụng đường bộ",
      order_id: newOrder.id,
      price: road_usage_fee,
    });
    await OrderDetails.create({
      description: "Phí trước bạ",
      order_id: newOrder.id,
      price: taxPrice,
    });
    await OrderDetails.create({
      description: "Bảo hiểm TNDS",
      order_id: newOrder.id,
      price: mandatoryInsurancePrice,
    });

    if (insurance && bodyInsurance != null) {
      await OrderDetails.create({
        description: "Bảo hiểm thân vỏ",
        order_id: newOrder.id,
        price: bodyInsuranceFee,
      });
    }

    res
      .status(201)
      .json({ message: "Order created successfully!", order: newOrder });
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
      return res.status(404).json({ message: "Order not found" });
    }
    order.total_price = total_price || order.total_price;
    order.order_status = order_status || order.order_status;
    await order.save();
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Orders.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.destroy();
    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
