import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import Staff from "../../models/Staff.js";
import StaffRole from "../../models/StaffRole.js";
import { Op } from "sequelize"; // Sequelize operators

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
    res.status(500).json({ error: "Something went wrong" });
  }
};
