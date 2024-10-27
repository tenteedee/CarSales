import TestDriveRequest from '../../models/TestDriveRequest.js';
import Car from '../../models/Car.js';
import { verifyToken } from '../../middleware/Auth.js';
import Customer from '../../models/Customer.js';
import Brand from '../../models/Brand.js';
import CarType from '../../models/CarType.js';
import Staff from '../../models/Staff.js';

export const requestTestDrive = async (req, res) => {
  const { car_id, customer_id, test_drive_date, showroom_id } = req.body;

  // Kiểm tra xem các trường bắt buộc có thiếu không
  if (!car_id || !test_drive_date || !showroom_id) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const selectedDate = new Date(test_drive_date);
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 2);

  // Kiểm tra xem ngày lái thử có ít nhất 2 ngày kể từ hôm nay không
  if (selectedDate < minDate) {
    return res
      .status(400)
      .json({ error: 'Test drive date must be at least 2 days from today.' });
  }

  try {
    // Tìm kiếm xe dựa trên car_id
    const car = await Car.findByPk(car_id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found.' });
    }

    // Lấy danh sách sales staff có role_id = 2 và showroom_id khớp với showroom được chọn
    const salesStaff = await Staff.findAll({
      where: { role_id: 2, showroom_id: showroom_id }, // Thêm điều kiện showroom_id
    });

    // Kiểm tra nếu không có nhân viên bán hàng nào
    if (!salesStaff || salesStaff.length === 0) {
      return res
        .status(404)
        .json({ error: 'No sales staff available for the selected showroom.' });
    }

    // Chọn ngẫu nhiên một sales staff từ danh sách
    const randomSalesStaff =
      salesStaff[Math.floor(Math.random() * salesStaff.length)];

    // Tạo yêu cầu lái thử và gán sales staff ngẫu nhiên từ showroom đã chọn
    const testDriveRequest = await TestDriveRequest.create({
      customer_id: customer_id,
      car_id: car_id,
      test_drive_date: test_drive_date,
      showroom_id: showroom_id,
      sales_staff_id: randomSalesStaff.id, // Gán sales staff ngẫu nhiên từ showroom đã chọn
    });

    // Trả về phản hồi thành công
    res.status(201).json({
      data: testDriveRequest,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getAllTestDriveRequests = async (req, res) => {
  try {
    const testDriveRequests = await TestDriveRequest.findAll({
      include: [
        {
          model: Car,
          attributes: ['model'],
          include: [
            {
              model: Brand,
              as: 'brand',
              attributes: ['name'],
            },
            {
              model: CarType,
              as: 'type',
              attributes: ['name'],
            },
          ],
        },
        {
          model: Customer,
          attributes: ['fullname', 'email', 'phone_number'],
        },
      ],
    });
    res.status(200).json(testDriveRequests);
  } catch (error) {
    console.error('Error fetching test drive requests:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getTestDriveRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const testDriveRequest = await TestDriveRequest.findByPk(id, {
      include: [
        {
          model: Car,
          attributes: ['model'],
          include: [
            {
              model: Brand,
              as: 'brand',
              attributes: ['name'],
            },
            {
              model: CarType,
              as: 'type',
              attributes: ['name'],
            },
          ],
        },
        {
          model: Customer,
          attributes: ['fullname', 'email', 'phone_number'],
        },
      ],
    });
    if (!testDriveRequest) {
      return res.status(404).json({ error: 'Test drive request not found.' });
    }
    res.status(200).json(testDriveRequest);
  } catch (error) {
    console.error('Error fetching test drive request:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getTestDriveRequestByCustomerId = async (req, res) => {
  const customer_id = req.query.customer;
  try {
    const testDriveRequests = await TestDriveRequest.findAll({
      where: { customer_id },
      include: [
        {
          model: Car,
          attributes: ['model'],
          include: [
            {
              model: Brand,
              as: 'brand',
              attributes: ['name'],
            },
            {
              model: CarType,
              as: 'type',
              attributes: ['name'],
            },
          ],
        },
        {
          model: Customer,
          attributes: ['fullname', 'email', 'phone_number'],
        },
      ],
    });
    res.status(200).json(testDriveRequests);
  } catch (error) {
    console.error('Error fetching test drive requests:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
