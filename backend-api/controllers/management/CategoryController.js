import NewsCategory from "../../models/NewsCategory.js";
import News from "../../models/News.js";
import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import { Op } from "sequelize";
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const existingCategory = await NewsCategory.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ error: "Danh mục đã tồn tại" });
    }

    const newCategory = await NewsCategory.create({
      name,
      description,
    });

    return res.status(201).json({ data: newCategory });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  const { name, description } = req.body;

  try {
    const category = await NewsCategory.findOne({ where: { id } });

    if (!category) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }

    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();

    return res.status(200).json({ data: category });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  try {
    const category = await NewsCategory.findOne({
      where: { id },
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
export const deleteCategories = async (req, res) => {
  let categoryIds = req.body.ids;
  if (!categoryIds || categoryIds.length === 0) {
    return res.status(500).json({ error: "Danh sách ID không hợp lệ" });
  }

  categoryIds = categoryIds.filter((id) => !isNaN(id));

  try {
    const hasNews = await Promise.all(
      categoryIds.map(async (categoryId) => {
        const countNewExsits = await News.findOne({
          where: { category_id: categoryId },
        });
        return countNewExsits != null ? categoryId : null;
      })
    );

    const existingNewsCategories = hasNews.filter((id) => id !== null);

    if (existingNewsCategories.length > 0) {
      return res
        .status(500)
        .json({
          error: "Vẫn còn tin của các danh mục này",
          categoryIds: existingNewsCategories,
        });
    }

    const deletedCount = await NewsCategory.destroy({
      where: {
        id: categoryIds,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy danh mục để xóa" });
    }

    res.status(200).json({ message: "Xóa thành công", deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Lỗi máy chủ khi xóa danh mục" });
  }
};

export const queryCategories = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "desc";
  const searchQuery = req.query.search || "";

  try {
    // const searchConditions = {};
    // if (searchQuery) {
    //   searchQuery.split("|").forEach((condition) => {
    //     const [key, value] = condition.split("=");
    //     if (key && value) {
    //       searchConditions[key] = {
    //         [Op.like]: `%${value}%`,
    //       };
    //     }
    //   });
    // }

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
    const totalCategory = await NewsCategory.count({
      where: searchConditions,
    });

    const categoriesList = await NewsCategory.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      order: [[sortColumn, sortOrder.toUpperCase()]],
    });

    const pagination = {
      current_page: currentPage,
      first_page_url: `${req.protocol}://${req.get("host")}${req.path}?page=1`,
      from: (currentPage - 1) * perPage + 1,
      last_page: Math.ceil(totalCategory / perPage),
      last_page_url: `${req.protocol}://${req.get("host")}${
        req.path
      }?page=${Math.ceil(totalCategory / perPage)}`,
      links: generatePaginationLinks(
        req,
        currentPage,
        Math.ceil(totalCategory / perPage)
      ),
      next_page_url:
        currentPage < Math.ceil(totalCategory / perPage)
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
        currentPage * perPage < totalCategory
          ? currentPage * perPage
          : totalCategory,
      total: totalCategory,
    };

    res.json({
      payload: {
        pagination: pagination,
      },
      data: categoriesList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
