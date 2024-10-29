import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import Showroom from "../../models/Showroom.js";
import Staff from "../../models/Staff.js";
import StaffRole from "../../models/StaffRole.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { APP_URL } from "../../config/Config.js";
import { sendMail } from "../../services/MailService.js";
import { randomPassword } from "../../helper/Utils.js";
import { generateStaffEmailTemplate } from "../../helper/EmailHelper.js";
export const updateStaffAvatar = async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  try {
    const staff = await Staff.findOne({
      where: { id },
      include: [
        {
          model: StaffRole,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: Showroom,
          as: "showroom",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!staff) {
      return res.status(404).json({ error: "Nhân viên không tồn tại" });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const avatarUrl = APP_URL + `assets/images/${file.filename}`;
    staff.avatar_url = avatarUrl;
    await staff.save();

    const updatedStaff = await Staff.findOne({
      where: { id },
      include: [
        {
          model: StaffRole,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: Showroom,
          as: "showroom",
          attributes: ["id", "name"],
        },
      ],
    });
    const staffData = updatedStaff.toJSON();
    staffData.password = "";
    return res.status(200).json({ data: staffData });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const createStaff = async (req, res) => {
  const {
    fullname,
    email,
    role_id,
    showroom_id,
    //password,
    phone_number,
    address,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg || "Dữ liệu đầu vào không hợp lệ",
      errors: errors.array(),
    });
  }
  try {
    const existingStaff = await Staff.findOne({ where: { email } });
    if (existingStaff) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }

    const saltRounds = 10;
    let password = randomPassword(12);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newStaff = await Staff.create({
      fullname,
      email,
      phone_number,
      address,
      password: hashedPassword,
    });

    if (role_id) {
      const role = await StaffRole.findOne({ where: { id: role_id } });
      if (!role) {
        return res.status(400).json({ error: "Vai trò không tồn tại" });
      }
      await newStaff.setRole(role);
    }

    if (showroom_id) {
      const showroom = await Showroom.findOne({ where: { id: showroom_id } });
      if (!showroom) {
        return res.status(400).json({ error: "Showroom không tồn tại" });
      }
      await newStaff.setShowroom(showroom);
    }

    const createdStaff = await Staff.findOne({
      where: { id: newStaff.id },
      include: [
        {
          model: StaffRole,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: Showroom,
          as: "showroom",
          attributes: ["id", "name"],
        },
      ],
    });
    try {
      const html = generateStaffEmailTemplate(createdStaff, password);
      await sendMail({
        to: createdStaff.email,
        subject: "Your account at CAR SHOP",
        html,
      });
    } catch (e) {}
    return res.status(201).json({ data: createdStaff });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const updateStaff = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  const {
    fullname,
    email,
    role_id,
    showroom_id,
    password,
    phone_number,
    address,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg || "Dữ liệu đầu vào không hợp lệ",
      errors: errors.array(),
    });
  }
  try {
    const staff = await Staff.findOne({
      where: { id },
      include: [
        {
          model: StaffRole,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: Showroom,
          as: "showroom",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!staff) {
      return res.status(404).json({ error: "Nhân viên không tồn tại" });
    }
    const existingStaff = await Staff.findOne({
      where: {
        email,
        id: { [Op.ne]: id },
      },
    });
    if (existingStaff) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }
    staff.fullname = fullname || staff.fullname;
    staff.email = email || staff.email;
    staff.phone_number = phone_number || staff.phone_number;
    staff.address = address || staff.address;

    if (role_id && id != 1) {
      const role = await StaffRole.findOne({ where: { id: role_id } });
      if (!role) {
        return res.status(400).json({ error: "Vai trò không tồn tại" });
      }
      await staff.setRole(role);
    }

    if (showroom_id) {
      const showroom = await Showroom.findOne({ where: { id: showroom_id } });
      if (!showroom) {
        return res.status(400).json({ error: "Showroom không tồn tại" });
      }
      await staff.setShowroom(showroom);
    }
    if (password) {
      let passwordChange = randomPassword(12);

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(passwordChange, saltRounds);
      staff.password = hashedPassword;
      const html = generateStaffEmailTemplate(staffData, passwordChange);
      await sendMail({
        to: staff.email,
        subject: "Your updated account at CAR SHOP",
        html,
      });
    }

    await staff.save();

    const updatedStaff = await Staff.findOne({
      where: { id },
      include: [
        {
          model: StaffRole,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: Showroom,
          as: "showroom",
          attributes: ["id", "name"],
        },
      ],
    });
    const staffData = updatedStaff.toJSON();
    staffData.password = "";
    return res.status(200).json({ data: staffData });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

export const getStaff = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
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
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: Showroom,
          as: "showroom",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!staff) {
      return res.status(404).json({ error: "Nhân viên không tồn tại" });
    }
    const staffData = staff.toJSON();
    staffData.password = "";
    return res.status(200).json({ data: staffData });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }

};
export const deleteStaff = async (req, res) => {
  let staffIds = req.body.ids;
  if (!staffIds || staffIds.length === 0) {
    res.status(500).json({ error: "Danh sách ID không hợp lệ" });
  }
  staffIds = staffIds.filter((id) => !isNaN(id) && id !== 1);
  if (staffIds.length === 0) {
    return res.status(400).json({ error: "Không có ID hợp lệ để xóa" });
  }
  try {
    const deletedCount = await Staff.destroy({
      where: {
        id: staffIds,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy nhân viên để xóa" });
    }

    res.status(200).json({ error: "Xóa thành công", deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ khi xóa nhân viên" });
  }
};

export const queryStaff = async (req, res) => {
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
    const totalStaff = await Staff.count({
      where: searchConditions,
    });

    const staffList = await Staff.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      include: [
        {
          model: StaffRole,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: Showroom,
          as: "showroom",
          attributes: ["id", "name"],
        },
      ],
      order: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get("host")}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalStaff / perPage),
      last_page_url: `${req.protocol}://${req.get("host")}${
        req.path
      }?page=${Math.ceil(totalStaff / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalStaff / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalStaff / perPage)
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
      total: totalStaff,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: staffList,
    });
  } catch (error) {
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
