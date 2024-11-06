import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import Orders from "../../models/Orders.js";
import { Op } from "sequelize";

export const queryOrder = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "desc";
  const searchQuery = req.query.search || "";

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

    const totalOrders = await Orders.count({
      where: searchConditions,
    });

    const ordersList = await Orders.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      include: [
        //   {
        //     model: Brand,
        //     as: "brand",
        //     attributes: ["name"],
        //   }
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

export const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findByPk(req.params.id, {
      include: ["orderDetails", "car"],
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const newOrder = await Orders.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updated = await Orders.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedOrder = await Orders.findByPk(req.params.id);
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Orders.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Order deleted");
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
