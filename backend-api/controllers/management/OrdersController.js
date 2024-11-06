import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import Orders from "../../models/Orders.js";
import { Op } from "sequelize";
import Staff from "../../models/Staff.js";
import Customer from "../../models/Customer.js";
import Car from "../../models/Car.js";
import OrderDetails from "../../models/OrderDetails.js";
import Showroom from "../../models/Showroom.js";
export const getOrder = async (req, res) => {
  const { id } = req.params;
  const staff = req.user;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  try {
    const order = await Orders.findOne({
      where: { id },
      include: [
        {
          model: Staff,
          as: "technical_staff",
          attributes: ["fullname", "email", "phone_number"],
        },
        {
          model: Staff,
          as: "sales_staff",
          attributes: ["fullname", "email", "phone_number"],
        },
        {
          model: Staff,
          as: "insurance_staff",
          attributes: ["fullname", "email", "phone_number"],
        },
        {
          model: Customer,
          as: "customer",
          attributes: ["fullname", "email", "phone_number"],
        },
        {
          model: Car,
          as: "car",
        },
        {
          model: Showroom,
          as: "showroom",
        },
        {
          model: OrderDetails,
          as: "order_details",
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: "Yêu cầu không tồn tại" });
    }
    if (staff.role.name == "Sale") {
      if (order.sales_staff_id != staff.id) {
        return res.status(404).json({ error: "Yêu cầu không tồn tại" });
      }
    }
    if (staff.role.name == "Insurance") {
      if (order.insurance_staff_id != staff.id) {
        return res.status(404).json({ error: "Yêu cầu không tồn tại" });
      }
    }
    if (staff.role.name == "Technical") {
      if (order.technical_staff_id != staff.id) {
        return res.status(404).json({ error: "Yêu cầu không tồn tại" });
      }
    }
    const data = order.toJSON();
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message ?? "Lỗi máy chủ" });
  }
};
export const queryOrder = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "desc";
  const searchQuery = req.query.search || "";
  const staff = req.user;

  try {
    const searchConditions = {};
    const specialKeys = [];

    if (searchQuery) {
      searchQuery.split("|").forEach((condition) => {
        const [key, value] = condition.split("=");

        if (key && value) {
          if (specialKeys.includes(key)) {
            const modifiedValue = `%${value.split(" ").join("%")}%`;
            searchConditions[key] = {
              [Op.like]: modifiedValue,
            };
          } else {
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
        }
      });
    }
    if (staff.role.name == "Sale") {
      searchConditions.sales_staff_id = staff.id;
    } else if (staff.role.name == "Insurance") {
      searchConditions.insurance_staff_id = staff.id;
    } else if (staff.role.name == "Technical") {
      searchConditions.technical_staff_id = staff.id;
    }
    const totalOrders = await Orders.count({
      where: searchConditions,
    });

    const ordersList = await Orders.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      include: [
        {
          model: Staff,
          as: "technical_staff",
          attributes: ["fullname", "email", "phone_number"],
        },
        {
          model: Staff,
          as: "sales_staff",
          attributes: ["fullname", "email", "phone_number"],
        },
        {
          model: Staff,
          as: "insurance_staff",
          attributes: ["fullname", "email", "phone_number"],
        },
        {
          model: Customer,
          as: "customer",
          attributes: ["fullname", "email", "phone_number"],
        },
        {
          model: Car,
          as: "car",
        },
        {
          model: Showroom,
          as: "showroom",
        },
      ],
      order: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get("host")}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalOrders / perPage),
      last_page_url: `${req.protocol}://${req.get("host")}${
        req.path
      }?page=${Math.ceil(totalOrders / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalOrders / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalOrders / perPage)
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
      to:
        currentPage * perPage < totalOrders
          ? currentPage * perPage
          : totalOrders,
      total: totalOrders,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: ordersList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};
export const deleteOrders = async (req, res) => {
  let Ids = req.body.ids;
  if (!Ids || Ids.length === 0) {
    res.status(500).json({ error: "Danh sách ID không hợp lệ" });
  }
  Ids = Ids.filter((id) => !isNaN(id));
  if (Ids.length === 0) {
    return res.status(400).json({ error: "Không có ID hợp lệ để xóa" });
  }
  try {
    const deletedDeltails = await OrderDetails.destroy({
      where: {
        order_id: Ids,
      },
    });

    const deletedCount = await Orders.destroy({
      where: {
        id: Ids,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng để xóa" });
    }

    res.status(200).json({ error: "Xóa thành công", deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ khi xóa đơn hàng" });
  }
};
