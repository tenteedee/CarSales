import Showroom from '../../models/Showroom.js';
import Staff from '../../models/Staff.js';
import StaffRole from '../../models/StaffRole.js';
import { Op } from 'sequelize';

export const getStaff = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID không hợp lệ' });
  }
  try {
    const staff = await Staff.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      include: [
        {
          model: StaffRole,
          as: 'role',
          attributes: ['id', 'name'],
        },
        {
          model: Showroom,
          as: 'showroom',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!staff) {
      return res.status(404).json({ error: 'Nhân viên không tồn tại' });
    }
    const staffData = staff.toJSON();
    staffData.password = '';
    return res.status(200).json({ data: staffData });
  } catch (error) {
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll({
      include: [
        {
          model: StaffRole,
          as: 'role',
          attributes: ['id', 'name'],
        },
        {
          model: Showroom,
          as: 'showroom',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.status(200).json(staff);
  } catch (error) {
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};
