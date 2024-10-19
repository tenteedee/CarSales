import Showroom from "../../models/Showroom.js";
import Staff from "../../models/Staff.js";
import Order from "../../models/Orders.js"
import { Op } from 'sequelize';

export const listShowrooms = async (req, res) => {
  try {
    const showrooms = await Showroom.findAll({
      attributes: ['id', 'name', 'address', 'phone_number'], // Chọn các thuộc tính cần thiết
    
    });

    if (!showrooms || showrooms.length === 0) {
      return res.status(404).json({ message: 'No showrooms found!' });
    }

    res.status(200).json(showrooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShowroom = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID không hợp lệ" });
    }
    try {
      const showroom = await Showroom.findOne({
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      });
  
      if (!showroom) {
        return res.status(404).json({ error: "Showroom không tồn tại" });
      }
      const showroomData = showroom.toJSON();
      return res.status(200).json({ data: showroomData });
    } catch (error) {
      return res.status(500).json({ error: "Lỗi máy chủ" });
    }
  };