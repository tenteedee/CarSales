import Showroom from "../../models/Showroom.js";
import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import { Op } from "sequelize";
export const queryShowrooms = async (req, res) => {
  // const showrooms = await Showroom.findAll({});
  // res.json({
  //   data: showrooms,
  // });
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
          searchConditions[key] = {
            [Op.like]: `%${value}%`,
          };
        }
      });
    }

    const totalShowroom = await Showroom.count({
      where: searchConditions,
    });

    const showroomList = await Showroom.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,

      order: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get("host")}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalShowroom / perPage),
      last_page_url: `${req.protocol}://${req.get("host")}${
        req.path
      }?page=${Math.ceil(totalShowroom / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalShowroom / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalShowroom / perPage)
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
      total: totalShowroom,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: showroomList,
    });
  } catch (error) {
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
