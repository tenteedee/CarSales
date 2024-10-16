import { Op } from "sequelize";
import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import Staff from "../../models/Staff.js";
import TestDriveRequest from "../../models/TestDriveRequest.js";
import Car from "../../models/Car.js";
import Customer from "../../models/Customer.js";
export const getTestDrive = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  try {
    const category = await TestDriveRequest.findOne({
      where: { id },
      include: [
        {
          model: Car,
          as: "car",
          attributes: ["id", "model"],
        },
        {
          model: Staff,
          as: "staff",
          attributes: ["id", "fullname"],
        },
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "fullname"],
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }
    const data = category.toJSON();
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const queryTestDrive = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "desc";
  const searchQuery = req.query.search || "";
  const staff = req.user;
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
    if (staff.role.name !== "Director") {
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
          as: "car",
          attributes: ["id", "model"],
        },
        {
          model: Staff,
          as: "staff",
          attributes: ["id", "fullname"],
        },
        {
          model: Customer,
          as: "customer",
          attributes: ["id", "fullname"],
        },
      ],
      order: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get("host")}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalTestDriveRequest / perPage),
      last_page_url: `${req.protocol}://${req.get("host")}${
        req.path
      }?page=${Math.ceil(totalTestDriveRequest / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalTestDriveRequest / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalTestDriveRequest / perPage)
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
      total: totalTestDriveRequest,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: testDriveList,
    });
  } catch (error) {
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
