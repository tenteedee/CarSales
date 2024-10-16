import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import { Op } from "sequelize";
import Car from "../../models/Car.js";

export const queryCars = async (req, res) => {
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

    const totalCars = await Car.count({
      where: searchConditions,
    });

    const carsList = await Car.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      include: [
        // {
        //   model: Staff,
        //   as: "posted",
        //   attributes: ["id", "fullname"],
        // },
      ],
      order: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get("host")}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalCars / perPage),
      last_page_url: `${req.protocol}://${req.get("host")}${
        req.path
      }?page=${Math.ceil(totalCars / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalCars / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalCars / perPage)
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
      to: currentPage * perPage < totalCars ? currentPage * perPage : totalCars,
      total: totalCars,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: carsList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
