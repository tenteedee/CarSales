import { Op } from 'sequelize';
import { generatePaginationLinks } from '../../helper/PagingHelper.js';
import Staff from '../../models/Staff.js';
import TestDriveRequest from '../../models/TestDriveRequest.js';
import Car from '../../models/Car.js';
import Customer from '../../models/Customer.js';
import {
  generateTestDriveEmailStaff,
  generateTestDriveEmailCustomer,
} from '../../helper/EmailHelper.js';
import { sendMail } from '../../services/MailService.js';
export const createTestDrive = async (req, res) => {
  try {
    const { car_id, sales_staff_id, test_drive_date, customer_id, status } =
      req.body;
    const customer = await Customer.findOne({ where: { id: customer_id } });
    if (!customer) {
      return res.status(400).json({ error: 'Khách hàng không tồn tại' });
    }
    const car = await Car.findOne({ where: { id: car_id } });
    if (!car) {
      return res.status(400).json({ error: 'Car không tồn tại' });
    }
    const staffCheck = await Staff.findOne({
      where: { id: sales_staff_id, role_id: 2 },
    });
    if (!staffCheck) {
      return res.status(400).json({ error: 'Sale không tồn tại' });
    }
    const validStatuses = ['pending', 'approved', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Trạng thái không hợp lệ' });
    }
    const newTestDrive = await TestDriveRequest.create({
      car_id,
      customer_id,
      sales_staff_id,
      test_drive_date,
      status,
      showroom_id: staffCheck.showroom_id,
    });

    return res
      .status(201)
      .json({ message: 'Tạo Test Drive thành công', data: newTestDrive });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Lỗi máy chủ khi tạo Test Drive' });
  }
};
export const deleteTestDrive = async (req, res) => {
  let Ids = req.body.ids;
  if (!Ids || Ids.length === 0) {
    res.status(500).json({ error: 'Danh sách ID không hợp lệ' });
  }
  Ids = Ids.filter((id) => !isNaN(id));
  if (Ids.length === 0) {
    return res.status(400).json({ error: 'Không có ID hợp lệ để xóa' });
  }
  try {
    const deletedCount = await TestDriveRequest.destroy({
      where: {
        id: Ids,
      },
    });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ error: 'Không tìm thấy yêu cầu lái thử để xóa' });
    }

    res.status(200).json({ error: 'Xóa thành công', deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi máy chủ khi xóa yêu cầu lái thử' });
  }
};
export const updateTestDrive = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID không hợp lệ' });
  }
  const { car_id, staff_id, test_drive_date, status } = req.body;

  try {
    const testDrive = await TestDriveRequest.findOne({
      where: { id },
      include: [
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'model'],
        },
        {
          model: Staff,
          as: 'staff',
          attributes: ['id', 'fullname', 'email'],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'fullname', 'email'],
        },
      ],
    });

    if (!testDrive) {
      return res.status(404).json({ error: 'Yêu cầu không tồn tại' });
    }

    // Validate `test_drive_date` and `status`
    const testDriveDate = new Date(testDrive.test_drive_date);
    const currentDate = new Date();
    const hoursUntilTestDrive = (testDriveDate - currentDate) / (1000 * 3600);

    if (staff_id) {
      if (status !== 'pending') {
        return res.status(400).json({
          error:
            'Không thể thay đổi nhân viên Sale khi yêu cầu đã được thực thi',
        });
      }

      if (hoursUntilTestDrive < 24) {
        return res
          .status(400)
          .json({ error: 'Chỉ được thay đổi sale trước 24 giờ' });
      }

      const staffCheck = await Staff.findOne({
        where: { id: staff_id, role_id: 2 },
      });

      if (!staffCheck) {
        return res.status(400).json({ error: 'Sale không tồn tại' });
      }
      if (staffCheck.showroom_id != testDrive.showroom_id) {
        return res
          .status(400)
          .json({ error: 'Sale không làm việc tại showroom khách chọn!' });
      }

      const previousStaffId = testDrive.sales_staff_id;
      if (staff_id !== previousStaffId) {
        await testDrive.setStaff(staffCheck);

        // Send email to the new staff member
        try {
          const html = generateTestDriveEmailStaff(staffCheck, testDrive);
          await sendMail({
            to: staffCheck.email,
            subject: 'New Test Drive Assignment at CAR SHOP',
            html,
          });
        } catch (e) {
          console.error(
            'Failed to send email to the new staff member:',
            e.message
          );
        }
      }
    }

    // Set car if provided
    if (car_id) {
      const car = await Car.findOne({ where: { id: car_id } });
      if (!car) {
        return res.status(400).json({ error: 'Car không tồn tại' });
      }
      await testDrive.setCar(car);
    }

    // Update `test_drive_date`
    testDrive.test_drive_date = test_drive_date || testDrive.test_drive_date;

    // Update `status`
    if (status) {
      if (['pending', 'approved', 'completed', 'cancelled'].includes(status)) {
        testDrive.status = status;
      } else {
        return res.status(400).json({ error: 'Trạng thái không hợp lệ' });
      }
    }

    await testDrive.save();

    const customer = await findCustomerById(testDrive.customer_id);
    const assignedStaff = await findStaffById(testDrive.sales_staff_id);

    // Send email to customer with the updated information
    if (status) {
      console.log(status);
      try {
        const html = generateTestDriveEmailCustomer(
          customer,
          testDrive,
          assignedStaff
        );
        await sendMail({
          to: customer.email,
          subject: 'Your requested test drive at CAR SHOP',
          html,
        });
      } catch (e) {
        console.error('Failed to send email to customer:', e.message);
      }
    }

    return res.status(200).json({ data: testDrive.toJSON() });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

export const getTestDrive = async (req, res) => {
  const { id } = req.params;
  const staff = req.user;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID không hợp lệ' });
  }
  try {
    const testDrive = await TestDriveRequest.findOne({
      where: { id },
      include: [
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'model'],
        },
        {
          model: Staff,
          as: 'staff',
          attributes: ['id', 'fullname', 'email'],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'fullname', 'email', 'phone_number'],
        },
      ],
    });

    if (!testDrive) {
      return res.status(404).json({ error: 'Yêu cầu không tồn tại' });
    }
    if (staff.role.name !== 'Director') {
      if (testDrive.sales_staff_id != staff.id) {
        return res.status(404).json({ error: 'Yêu cầu không tồn tại' });
      }
    }

    const data = testDrive.toJSON();
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};
export const queryTestDrive = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || 'id';
  const sortOrder = req.query.order || 'desc';
  const searchQuery = req.query.search || '';
  const staff = req.user;
  try {
    const searchConditions = {};
    if (searchQuery) {
      searchQuery.split('|').forEach((condition) => {
        const [key, value] = condition.split('=');
        if (key && value) {
          if (value.includes(',')) {
            const values = value.split(',').map((v) => ({
              [Op.like]: `%${v}%`,
            }));
            searchConditions[key] = {
              [Op.or]: values,
            };
          } else {
            searchConditions[key] = {
              [Op.like]: `%${value}%`,
            };
          }
        }
      });
    }
    if (staff.role.name !== 'Director') {
      searchConditions.sales_staff_id = staff.id;
    }
    const totalTestDriveRequest = await TestDriveRequest.count({
      where: searchConditions,
    });

    const testDriveList = await TestDriveRequest.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      include: [
        {
          model: Car,
          as: 'car',
          attributes: ['id', 'model'],
        },
        {
          model: Staff,
          as: 'staff',
          attributes: ['id', 'fullname', 'email'],
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'fullname', 'email', 'phone_number'],
        },
      ],
      order: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get('host')}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalTestDriveRequest / perPage),
      last_page_url: `${req.protocol}://${req.get('host')}${
        req.path
      }?page=${Math.ceil(totalTestDriveRequest / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalTestDriveRequest / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalTestDriveRequest / perPage)
          ? `${req.protocol}://${req.get('host')}${req.path}?page=${
              currentPage + 1
            }`
          : null,
      path: `${req.protocol}://${req.get('host')}${req.path}`,
      per_page: perPage.toString(),
      prev_page_url:
        currentPage > 1
          ? `${req.protocol}://${req.get('host')}${req.path}?page=${
              currentPage - 1
            }`
          : null,
      to: currentPage * perPage,
      total: totalTestDriveRequest,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: testDriveList,
    });
  } catch (error) {
    res.status(500).json({ error: error || 'Something went wrong' });
  }
};

export const findCustomerById = async (id) => {
  if (isNaN(id)) throw new Error('ID không hợp lệ');

  const customer = await Customer.findOne({
    where: { id: id },
    attributes: { exclude: ['password'] },
  });

  if (!customer) throw new Error('Khách hàng không tồn tại');

  return customer;
};

export const findStaffById = async (id) => {
  if (isNaN(id)) throw new Error('ID không hợp lệ');

  const staff = await Staff.findOne({ where: { id: id } });

  if (!staff) throw new Error('Nhân viên không tồn tại');

  return staff;
};
