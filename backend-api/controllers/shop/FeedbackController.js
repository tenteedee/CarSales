import Feedback from "./../../models/Feedback.js";
import Order from "./../../models/Orders.js";
import Car from "./../../models/Car.js";
import Customer from "./../../models/Customer.js";
import TestDriveRequest from "../../models/TestDriveRequest.js";

export const createFeedback = async (req, res) => {
  const { car_id, rating, content } = req.body;
  try {
    const hasPurchased = await TestDriveRequest.findOne({
      where: {
        customer_id: req.user.id,
        car_id: car_id,
      },
    });

    if (!hasPurchased) {
      return res.status(403).json({
        error: "You can only provide feedback for cars you have tried.",
      });
    }

    const feedback = await Feedback.create({
      customer_id: req.user.id,
      car_id,
      rating,
      content,
    });

    res.status(201).json({
      message: "Feedback created successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating feedback." });
  }
};

export const getFeedbackByCarId = async (req, res) => {
  const { car_id } = req.params;

  try {
    const feedbacks = await Feedback.findAll({
      where: { car_id },
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "fullname"],
        },
        {
          model: Car,
          as: "car",
          attributes: ["id", "model"],
        },
      ],
    });

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching feedback." });
  }
};
