import News from "../../models/News.js";
import NewsCategory from "../../models/NewsCategory.js";
import Staff from "../../models/Staff.js";

import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import { Op } from "sequelize";

export const getNews = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  try {
    const news = await News.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      include: [
        {
          model: NewsCategory,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Staff,
          as: "posted",
          attributes: ["id", "fullname"],
        },
      ],
    });

    if (!news) {
      return res.status(404).json({ error: "Tin tức không tồn tại" });
    }
    const newsData = news.toJSON();
    newsData.password = "";
    return res.status(200).json({ data: newsData });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

export const queryNews = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "desc";
  const searchQuery = req.query.search || "";

  try {
    const searchConditions = {};
    const specialKeys = ["title", "heading"];

    if (searchQuery) {
      searchQuery.split("|").forEach((condition) => {
        const [key, value] = condition.split("=");

        if (key && value) {
          if (specialKeys.includes(key)) {
            const words = value.split(" ");
            const modifiedValues = words.map((word) => ({
              [Op.like]: `%${word}%`,
            }));

            searchConditions[key] = {
              [Op.and]: modifiedValues,
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

    const totalNews = await News.count({
      where: searchConditions,
    });

    const newsList = await News.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      include: [
        {
          model: NewsCategory,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Staff,
          as: "posted",
          attributes: ["id", "fullname"],
        },
      ],
      order: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get("host")}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalNews / perPage),
      last_page_url: `${req.protocol}://${req.get("host")}${
        req.path
      }?page=${Math.ceil(totalNews / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalNews / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalNews / perPage)
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
      to: currentPage * perPage < totalNews ? currentPage * perPage : totalNews,
      total: totalNews,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: newsList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
export const getNewsById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  try {
    const news = await News.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
      include: [
        {
          model: NewsCategory,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Staff,
          as: "posted",
          attributes: ["id", "fullname"],
        },
      ],
    });

    if (!news) {
      return res.status(404).json({ error: "Tin tức không tồn tại" });
    }
    const newsData = news.toJSON();
    newsData.password = ""; // Ensure sensitive data is not exposed
    return res.status(200).json({ data: newsData });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
