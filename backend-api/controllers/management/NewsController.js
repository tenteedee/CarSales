import News from "../../models/News.js";
import NewsCategory from "../../models/NewsCategory.js";
import Staff from "../../models/Staff.js";

import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import { Op } from "sequelize";
export const createNews = async (req, res) => {
  const { title, content, category_id, heading, image } = req.body;
  try {
    const existingCategory = await NewsCategory.findOne({
      where: { id: category_id },
    });
    if (!existingCategory) {
      return res.status(400).json({ error: "Danh mục không tồn tại" });
    }
    const newCategory = await News.create({
      image,
      title,
      heading,
      content,
      category_id,
      is_pin: 0,
      status: 0,
      posted_by: req.user.id,
    });

    return res.status(201).json({ data: newCategory });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ", e: error });
  }
};
export const updateNews = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  const { title, content, category_id, heading, image } = req.body;
  try {
    const news = await News.findOne({ where: { id } });

    if (!news) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }
    if (category_id) {
      const category = await NewsCategory.findOne({
        where: { id: category_id },
      });
      if (!category) {
        return res.status(400).json({ error: "Danh mục không tồn tại" });
      }
      await news.setCategory(category);
    }
    news.title = title || news.title;
    news.heading = heading || news.heading;
    news.content = content || news.content;
    news.image = image || news.image;

    await news.save();

    return res.status(200).json({ data: news });
  } catch (error) {
    return res.status(500).json({ error: error || "Lỗi máy chủ" });
  }
};
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

export const deleteNews = async (req, res) => {
  let newsIds = req.body.ids;
  if (!newsIds || newsIds.length === 0) {
    res.status(500).json({ error: "Danh sách ID không hợp lệ" });
  }
  newsIds = newsIds.filter((id) => !isNaN(id));
  if (newsIds.length === 0) {
    return res.status(400).json({ error: "Không có ID hợp lệ để xóa" });
  }
  try {
    const deletedCount = await News.destroy({
      where: {
        id: newsIds,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy news để xóa" });
    }

    res.status(200).json({ error: "Xóa thành công", deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Lỗi máy chủ khi xóa news" });
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
    const specialKeys = ["title", "heading"]; // Các key mà bạn muốn tìm kiếm chuỗi con

    if (searchQuery) {
      searchQuery.split("|").forEach((condition) => {
        const [key, value] = condition.split("=");

        if (key && value) {
          if (specialKeys.includes(key)) {
            // Xử lý trường hợp tìm kiếm theo chuỗi con
            const modifiedValue = `%${value.split(" ").join("%")}%`;
            searchConditions[key] = {
              [Op.like]: modifiedValue, // Tìm kiếm dựa trên chuỗi đã thay đổi
            };
          } else {
            // Xử lý khi có nhiều giá trị, ví dụ: value=1,2,3
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
