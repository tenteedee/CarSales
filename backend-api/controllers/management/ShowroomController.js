import Showroom from "../../models/Showroom.js";
import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import { Op } from "sequelize";
import { validationResult } from "express-validator";
export const deleteShowroom = async (req, res) => {
  let Ids = req.body.ids;
  if (!Ids || Ids.length === 0) {
    res.status(500).json({ error: "Danh sách ID không hợp lệ" });
  }
  Ids = Ids.filter((id) => !isNaN(id));
  if (Ids.length === 0) {
    return res.status(400).json({ error: "Không có ID hợp lệ để xóa" });
  }
  try {
    const deletedCount = await Showroom.destroy({
      where: {
        id: Ids,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy nhân viên để xóa" });
    }

    res.status(200).json({ error: "Xóa thành công", deletedCount });
  } catch (error) {
    res.status(500).json({ error: "Lỗi máy chủ khi xóa nhân viên" });
  }
};
export const createShowroom = async (req, res) => {
  try {
    const { name, email, address, phone_number } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg || "Dữ liệu đầu vào không hợp lệ",
        errors: errors.array(),
      });
    }
    const newShowroom = await Showroom.create({
      name,
      email,
      phone_number,
      address,
    });
    return res.status(201).json({ data: newShowroom });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const updateShowroom = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  try {
    const { name, email, address, phone_number } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg || "Dữ liệu đầu vào không hợp lệ",
        errors: errors.array(),
      });
    }

    const showroom = await Showroom.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });

    if (!showroom) {
      return res.status(404).json({ error: "Showroom không tồn tại" });
    }
    showroom.name = name || showroom.name;
    showroom.email = email || showroom.email;
    showroom.phone_number = phone_number || showroom.phone_number;
    showroom.address = address || showroom.address;
    await showroom.save();
    const updatedShowroom = await Showroom.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    const showroomData = updatedShowroom.toJSON();
    return res.status(200).json({ data: showroomData });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const getShowroom = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }
  try {
    const showroom = await Showroom.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });

    if (!showroom) {
      return res.status(404).json({ error: "Showroom không tồn tại" });
    }
    const showroomData = showroom.toJSON();
    return res.status(200).json({ data: showroomData });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi máy chủ" });
  }
};
export const queryShowrooms = async (req, res) => {
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
