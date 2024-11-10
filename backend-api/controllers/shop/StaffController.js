import Staff from '../../models/Staff.js';
import StaffRole from '../../models/StaffRole.js';

export const getAllStaffs = async (req, res) => {
  try {
    const staffs = await Staff.findAll({
      attributes: [
        'id',
        'fullname',
        'email',
        'phone_number',
        'role_id',
        'showroom_id',
      ],
    });
    res.status(200).json({
      data: staffs,
    });
  } catch (error) {
    console.error('Error fetching all staffs:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getStaffById = async (req, res) => {
  const { id } = req.params; // Lấy ID từ req.params

  try {
    const staff = await Staff.findByPk({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      attributes: [
        'id',
        'fullname',
        'email',
        'phone_number',
        'role_id',
        'showroom_id',
      ],
    });

    if (!staff) {
      return res.status(404).json({ error: 'Staff member not found.' });
    }

    res.status(200).json({
      message: `Details of staff member with ID: ${id}`,
      data: staff,
    });
  } catch (error) {
    console.error(`Error fetching staff with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
