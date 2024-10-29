import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import Customer from "../../models/Customer.js";
import { validationResult } from "express-validator";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { sendMail } from "../../services/MailService.js";
import { randomPassword } from "../../helper/Utils.js";
import { generateCustomerEmailTemplate } from "../../helper/EmailHelper.js";
export const createCustomer = async (req, res) => {
  const { fullname, email, phone_number, address, date_of_birth } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg || "Dữ liệu đầu vào không hợp lệ",
      errors: errors.array(),
    });
  }
  try {
    const existingCustomer = await Customer.findOne({
      where: {
        email,
      },
    });

    if (existingCustomer) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }
    const saltRounds = 10;
    let password = randomPassword(12);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newData = await Customer.create({
      fullname,
      email,
      phone_number,
      address,
      date_of_birth,
      password: hashedPassword,
    });
    const created = await Customer.findOne({
      where: { id: newData.id },
      include: [],
    });
    try {
      const html = generateCustomerEmailTemplate(created, password);
      await sendMail({
        to: created.email,
        subject: "Your account at CAR SHOP",
        html,
      });
    } catch (e) {}
    return res.status(201).json({ data: created });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }

  const { fullname, email, password, phone_number, address, date_of_birth } =
    req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg || "Dữ liệu đầu vào không hợp lệ",
      errors: errors.array(),
    });
  }

  try {
    const customer = await Customer.findOne({
      where: { id },
      include: [],
    });

    if (!customer) {
      return res.status(404).json({ error: "Khách hàng không tồn tại" });
    }

    const existingCustomer = await Customer.findOne({
      where: {
        email,
        id: { [Op.ne]: id },
      },
    });

    if (existingCustomer) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }

    // Cập nhật thông tin nếu có thay đổi
    customer.fullname = fullname || customer.fullname;
    customer.email = email || customer.email;
    customer.phone_number = phone_number || customer.phone_number;
    customer.address = address || customer.address;
    customer.date_of_birth = date_of_birth || customer.date_of_birth;

    // Cập nhật mật khẩu nếu có
    if (password) {
      let passwordChange = randomPassword(12);
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(passwordChange, saltRounds);
      customer.password = hashedPassword;

      // Chuẩn bị email để gửi thông báo
      const html = generateCustomerEmailTemplate(
        customer.toJSON(),
        passwordChange
      );
      await sendMail({
        to: customer.email,
        subject: "Your updated account at CAR SHOP",
        html,
      });
    }

    // Lưu các thay đổi
    await customer.save();

    // Tải lại thông tin nhân viên đã cập nhật
    const updatedcustomer = await Customer.findOne({
      where: { id },
      include: [],
    });

    // Loại bỏ mật khẩu khỏi dữ liệu trả về
    const customerData = updatedcustomer.toJSON();
    delete customerData.password;

    return res.status(200).json({ data: customerData });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

export const deleteCustomer = async (req, res) => {
  let Ids = req.body.ids;
  if (!Ids || Ids.length === 0) {
    res.status(500).json({ error: "Danh sách ID không hợp lệ" });
  }
  Ids = Ids.filter((id) => !isNaN(id));
  if (Ids.length === 0) {
    return res.status(400).json({ error: "Không có ID hợp lệ để xóa" });
  }
  try {
    const deletedCount = await Customer.destroy({
      where: {
        id: Ids,
      },
    });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy khách hàng để xóa" });
    }

    res.status(200).json({ error: "Xóa thành công", deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ khi xóa khách hàng" });
  }
};
export const getCustomer = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  try {
    const dataCustomer = await Customer.findOne({
      where: { id },
      include: [],
    });

    if (!dataCustomer) {
      return res.status(404).json({ error: "Khách hàng không tồn tại" });
    }
    const json = dataCustomer.toJSON();
    delete json.password;
    return res.status(200).json({ data: json });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const query = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "desc";
  const searchQuery = req.query.search || "";

  try {
    const searchConditions = {};
    if (searchQuery) {
      searchQuery.split("|").forEach((condition) => {
        const [key, value] = condition.split("=");
        if (key && value) {
          if (value.includes(",")) {
            const values = value.split(",").map((v) => ({
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
    const totalCustomer = await Customer.count({
      where: searchConditions,
    });

    const CustomerList = await Customer.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      include: [],
      order: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get("host")}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalCustomer / perPage),
      last_page_url: `${req.protocol}://${req.get("host")}${
        req.path
      }?page=${Math.ceil(totalCustomer / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalCustomer / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalCustomer / perPage)
          ? `${req.protocol}://${req.get("host")}${req.path}?page=${
              currentPage + 1
            }`
          : null,
      path: `${req.protocol}://${req.get("host")}${req.path}`,
      per_page: perPage.toString(),
      prev_page_url:
        currentPage > 1
          ? `${req.protocol}://${req.get("host")}${req.path}?page=${
              currentPage - 1
            }`
          : null,
      to: currentPage * perPage,
      total: totalCustomer,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: CustomerList,
    });
  } catch (error) {
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
