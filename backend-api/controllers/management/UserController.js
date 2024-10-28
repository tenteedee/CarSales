import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import Customer from "../../models/Customer.js";

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
      include: [
        //   {
        //     model: Showroom,
        //     as: "showroom",
        //     attributes: ["id", "name"],
        //   },
      ],
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
