import { APP_URL } from "../../config/Config.js";
import db from "../../config/Database.js";
import { checkStaffRole } from "../../helper/RoleHelper.js";
import Brand from "../../models/Brand.js";
import Car from "../../models/Car.js";
import Customer from "../../models/Customer.js";
import Orders from "../../models/Orders.js";
import { Op, Sequelize } from "sequelize";

const allowedTables = ["news", "customers"];
const allowedColumns = ["status", "is_pin"];

const tableRoles = {
  news: ["Director"],
  customers: ["Director"],
};

export const getTopSellingCars = async (req, res) => {
  try {
    const topSellingCars = await Orders.findAll({
      attributes: [
        "car_id",
        [Sequelize.fn("COUNT", Sequelize.col("car_id")), "sales_count"], // Đếm số lượng car_id
      ],
      include: [
        {
          model: Car,
          as: "car",
          include: [
            {
              model: Brand,
              as: "brand",
            },
          ],
          //attributes: ["model"], // Lấy tên xe từ bảng Car
        },
      ],
      group: ["car_id", "car.id"], // Nhóm theo car_id và car.id để JOIN chính xác
      order: [[Sequelize.literal("sales_count"), "DESC"]], // Sắp xếp giảm dần theo số lượng bán
      limit: 10, // Giới hạn top 10 xe bán chạy nhất
    });

    res.status(200).json({ data: topSellingCars });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

export const homeStatistic = async (req, res) => {
  try {
    const { type } = req.query;
    let startDate;
    const currentDate = new Date();
    switch (type) {
      case "day":
        startDate = new Date(currentDate);
        startDate.setHours(0, 0, 0, 0); // Đặt thời gian đầu ngày
        break;
      case "week":
        startDate = new Date(currentDate);
        const dayOfWeek = startDate.getDay();
        startDate.setDate(currentDate.getDate() - dayOfWeek); // Đặt thời gian đầu tuần (Chủ nhật)
        startDate.setHours(0, 0, 0, 0);
        break;
      case "month":
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ); // Đặt thời gian đầu tháng
        break;
      default:
        return res.status(400).json({ error: "Type không hợp lệ" });
    }
    const user = req.user;

    let whereCondition = {
      created_at: {
        [Op.gte]: startDate,
        [Op.lte]: currentDate,
      },
    };

    if (user.role.name === "Technical") {
      whereCondition = {
        ...whereCondition,
        technical_staff_id: user.id,
      };
    } else if (user.role.name === "Sale") {
      whereCondition = {
        ...whereCondition,
        sales_staff_id: user.id,
      };
    } else if (user.role.name === "Insurance") {
      whereCondition = {
        ...whereCondition,
        insurance_staff_id: user.id,
      };
    }

    const orders = await Orders.findAll({
      include: [
        {
          model: Car,
          as: "car",
          include: [
            {
              model: Brand,
              as: "brand",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Customer,
          as: "customer",
          attributes: ["fullname", "email", "phone_number"],
        },
      ],
      where: whereCondition,
      limit: 5, // Giới hạn kết quả trả về là 10 bản ghi
    });
    return res.status(200).json({ data: orders });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Lỗi máy chủ" });
  }
};
export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const urlUploaded = APP_URL + `assets/images/${file.filename}`;
    return res
      .status(200)
      .json({ message: "Upload thành công", url: urlUploaded });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Lỗi máy chủ" });
  }
};
export const updateState = async (req, res) => {
  try {
    const { table, column, id, checked } = req.body;
    const user = req.user;
    if (!table || !column || !id || checked === undefined) {
      return res.status(400).json({ error: "Thiếu các trường bắt buộc" });
    }
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: "Tên bảng không hợp lệ" });
    }
    if (!allowedColumns.includes(column)) {
      return res.status(400).json({ error: "Tên cột không hợp lệ" });
    }
    const allowedRolesForTable = checkStaffRole(user, tableRoles[table]);
    if (!allowedRolesForTable) {
      return res
        .status(403)
        .json({ error: "Bạn không có quyền cập nhật bảng này" });
    }
    let state = checked == false ? 0 : 1;
    const formattedSql = `UPDATE ${table} SET ${column} = ${db.escape(
      state
    )} WHERE id = ${db.escape(id)}`;
    const [results] = await db.query(formattedSql, [state, id]);
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy bản ghi với id tương ứng" });
    }
    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Lỗi máy chủ" });
  }
};
