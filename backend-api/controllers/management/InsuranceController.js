import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import { Op } from "sequelize";
import { validationResult } from "express-validator";
import InsuranceProvider from "../../models/InsuranceProvider.js";
export const deleteInsuranceProvider = async (req, res) => {
  let Ids = req.body.ids;
  if (!Ids || Ids.length === 0) {
    res.status(500).json({ error: "Danh sách ID không hợp lệ" });
  }
  Ids = Ids.filter((id) => !isNaN(id) && id !== 1);
  if (Ids.length === 0) {
    return res.status(400).json({ error: "Không có ID hợp lệ để xóa" });
  }
  try {
    const deletedCount = await InsuranceProvider.destroy({
      where: {
        id: Ids,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy để xóa" });
    }

    res.status(200).json({ error: "Xóa thành công", deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ khi xóa" });
  }
};
export const createInsuranceProvider = async (req, res) => {
  try {
    const { name, email, phone_number } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg || "Dữ liệu đầu vào không hợp lệ",
        errors: errors.array(),
      });
    }
    const newRow = await InsuranceProvider.create({
      phone_number,
      email,
      name,
    });

    const createdData = await InsuranceProvider.findOne({
      where: { id: newRow.id },
      include: [],
    });
    return res.status(200).json({ data: createdData });
  } catch (error) {
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
export const updateInsuranceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID không hợp lệ" });
    }
    const data = await InsuranceProvider.findOne({
      where: { id },
      include: [],
    });
    if (!data) {
      return res.status(404).json({ error: "Nhà cung cấp không tồn tại" });
    }
    const { name, email, phone_number } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg || "Dữ liệu đầu vào không hợp lệ",
        errors: errors.array(),
      });
    }
    data.email = email || data.email;
    data.phone_number = phone_number || data.phone_number;
    data.name = name || data.name;
    await data.save();
    const updatedData = await InsuranceProvider.findOne({
      where: { id },
      include: [],
    });
    return res.status(200).json({ data: updatedData });
  } catch (error) {
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
export const getInsuranceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID không hợp lệ" });
    }
    const data = await InsuranceProvider.findOne({
      where: { id },
      include: [],
    });
    if (!data) {
      return res.status(404).json({ error: "Nhà cung cấp không tồn tại" });
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
export const queryInsuranceProvider = async (req, res) => {
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

    const totalCars = await InsuranceProvider.count({
      where: searchConditions,
    });

    const carsList = await InsuranceProvider.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      include: [],
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
    res.status(500).json({ error: error || "Something went wrong" });
  }
};
