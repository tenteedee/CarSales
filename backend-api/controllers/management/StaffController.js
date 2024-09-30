import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import Showroom from "../../models/Showroom.js";
import Staff from "../../models/Staff.js";
import StaffRole from "../../models/StaffRole.js";
import { Op } from "sequelize"; // Sequelize operators
import bcrypt from "bcrypt";
export const createStaff = async (req, res) => {
  const { fullname, email, role_id, showroom_id, password, phone_number } =
    req.body; // Lấy các trường từ body

  try {
    // Kiểm tra xem các trường bắt buộc đã có hay chưa
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
    }

    const existingStaff = await Staff.findOne({ where: { email } });
    if (existingStaff) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }

    // Băm mật khẩu nếu có
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo nhân viên mới
    const newStaff = await Staff.create({
      fullname,
      email,
      phone_number,
      password: hashedPassword, // Lưu mật khẩu đã băm
    });

    // Cập nhật role nếu role_id có trong body
    if (role_id) {
      const role = await StaffRole.findOne({ where: { id: role_id } });
      if (!role) {
        return res.status(400).json({ error: "Vai trò không tồn tại" });
      }
      await newStaff.setRole(role); // Thiết lập mối quan hệ với role
    }

    // Cập nhật showroom nếu showroom_id có trong body
    if (showroom_id) {
      const showroom = await Showroom.findOne({ where: { id: showroom_id } });
      if (!showroom) {
        return res.status(400).json({ error: "Showroom không tồn tại" });
      }
      await newStaff.setShowroom(showroom); // Thiết lập mối quan hệ với showroom
    }

    // Lấy lại thông tin nhân viên vừa tạo bao gồm các mối quan hệ
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

    // Trả về thông tin nhân viên đã tạo
    return res.status(201).json({ data: createdStaff });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const updateStaff = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL
  const { fullname, email, role_id, showroom_id, password, phone_number } =
    req.body; // Lấy các trường cần cập nhật từ body

  try {
    // Tìm nhân viên theo ID
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

    staff.fullname = fullname || staff.fullname;
    staff.email = email || staff.email;
    staff.phone_number = phone_number || staff.phone_number;

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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      staff.password = hashedPassword;
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
  const { id } = req.params; // Lấy ID từ URL
  try {
    // Tìm nhân viên theo ID
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
      // Nếu không tìm thấy nhân viên
      return res.status(404).json({ error: "Nhân viên không tồn tại" });
    }
    const staffData = staff.toJSON();
    staffData.password = "";
    // Trả về thông tin nhân viên
    return res.status(200).json({ data: staffData });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const deleteStaff = async (req, res) => {
  let staffIds = req.body.ids; // Nhận mảng ID từ payload
  if (!staffIds || staffIds.length === 0) {
    res.status(500).json({ error: "Danh sách ID không hợp lệ" });
  }
  // Loại bỏ ID == 1 ra khỏi danh sách staffIds
  staffIds = staffIds.filter((id) => id !== 1);
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
    res.status(500).json({ error: "Lỗi máy chủ khi xóa nhân viên" });
  }
};

export const queryStaff = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || "id"; // Default sort by 'id'
  const sortOrder = req.query.order || "desc"; // Default order 'desc'
  const searchQuery = req.query.search || "";

  try {
    // Parsing the search query
    const searchConditions = {};
    if (searchQuery) {
      searchQuery.split("|").forEach((condition) => {
        const [key, value] = condition.split("=");
        if (key && value) {
          searchConditions[key] = {
            [Op.like]: `%${value}%`, // Modify this for more flexible searching
          };
        }
      });
    }

    // Counting total items with search condition
    const totalStaff = await Staff.count({
      where: searchConditions,
    });

    // Fetching paginated results
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
      order: [[sortColumn, sortOrder.toUpperCase()]], // Sorting logic
    });

    // Pagination
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
