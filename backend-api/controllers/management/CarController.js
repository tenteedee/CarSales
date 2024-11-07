import { generatePaginationLinks } from "../../helper/PagingHelper.js";
import { Op } from "sequelize";
import Car from "../../models/Car.js";
import Brand from "../../models/Brand.js";
import CarType from "../../models/CarType.js";
import CarImage from "../../models/CarImage.js";
import { APP_URL } from "../../config/Config.js";

export const queryCars = async (req, res) => {
  const perPage = parseInt(req.query.items_per_page) || 20;
  const currentPage = parseInt(req.query.page) || 1;
  const sortColumn = req.query.sort || "id";
  const sortOrder = req.query.order || "desc";
  const searchQuery = req.query.search || "";

  try {
    const searchConditions = {};
    const specialKeys = ["model", "description"];

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

    const totalCars = await Car.count({
      where: searchConditions,
    });

    const carsList = await Car.findAll({
      where: searchConditions,
      offset: (currentPage - 1) * perPage,
      limit: perPage,
      // attributes: ['id', 'model', 'price', 'description', 'stock'],
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["name"],
        },
        {
          model: CarType,
          as: "type",
          attributes: ["name"],
        },
        {
          model: CarImage,
          as: "images",
          attributes: ["image_url"],
        },
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
    res.status(500).json({ error: error || "Something went wrong" });
  }
};

export const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    if (isNaN(carId)) {
      return res.status(400).json({ error: "ID không hợp lệ" });
    }
    const car = await Car.findByPk(carId, {
      //attributes: ["id", "model", "price", "description", "stock"],
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["name"],
        },
        {
          model: CarType,
          as: "type",
          attributes: ["name"],
        },
        {
          model: CarImage,
          as: "images",
          attributes: ["image_url"],
        },
      ],
    });

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }
    const json = car.toJSON();
    return res.status(200).json({ data: json });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const createNewCar = async (req, res) => {
  try {
    const { model, brand_id, type_id, content, price, description, stock } =
      req.body;

    const brandId = parseInt(brand_id, 10);
    const typeId = parseInt(type_id, 10);

    const existingCar = await Car.findOne({
      where: {
        model,
        // brand_id: brandId,
        // type_id: typeId,
      },
      raw: true,
    });
    if (existingCar) {
      return res
        .status(400)
        .json({ error: "Car already exists in the system!" });
    }

    const newCar = await Car.create({
      model,
      brand_id: brandId,
      type_id: typeId,
      price,
      content,
      description,
      stock,
    });
    return res.status(201).json({ data: newCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCar = async (req, res) => {
  let Ids = req.body.ids;
  try {
    if (!Ids || Ids.length === 0) {
      res.status(500).json({ error: "Danh sách ID không hợp lệ" });
    }
    Ids = Ids.filter((id) => !isNaN(id));
    if (Ids.length === 0) {
      return res.status(400).json({ error: "Không có ID hợp lệ để xóa" });
    }
    const deletedCount = await Car.destroy({
      where: {
        id: Ids,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy xe để xóa" });
    }

    res.status(200).json({ error: "Xóa thành công", deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi máy chủ khi xóa xe" });
  }
};

export const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const { model, brand_id, type_id, price, stock, content } = req.body;
    const files = req.files;

    // Find the car by ID
    const car = await Car.findByPk(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Update the brand if brand_id is provided
    if (brand_id) {
      const brand = await Brand.findOne({ where: { id: brand_id } });
      if (!brand) {
        return res.status(400).json({ error: "Brand không tồn tại" });
      }
      await car.setBrand(brand);
    }

    // Update the type if type_id is provided
    if (type_id) {
      const type = await CarType.findOne({ where: { id: type_id } });
      if (!type) {
        return res.status(400).json({ error: "Type không tồn tại" });
      }
      await car.setType(type);
    }

    // Update regular fields
    car.model = model || car.model;
    car.price = price || car.price;
    car.stock = stock || car.stock;
    car.content = content || car.content;
    await car.save();
    // Parse `req.body.images`
    const deletedCount = await CarImage.destroy({
      where: {
        car_id: car.id,
      },
    });
    // Parse `req.body.images`
    let images = [];
    try {
      images = JSON.parse(req.body.images || "[]").map((image) => ({
        ...image,
      }));
    } catch (error) {
      return res.status(400).json({ error: "Invalid images format" });
    }

    console.log("Parsed images from req.body:", images);
    console.log("Files received in req.files:", req.files);

    // Set to track indices with uploaded files
    const processedIndices = new Set();

    // Process uploaded files
    for (const file of req.files) {
      const match = file.fieldname.match(/images\[(\d+)]\[file\]/);
      if (match) {
        const index = parseInt(match[1], 10);
        const filePath = `${APP_URL}assets/images/${file.filename}`;

        await CarImage.create({
          car_id: car.id,
          image_url: filePath,
        });

        // Mark this index as processed
        processedIndices.add(index);
      }
    }

    // Process URL-based images, skipping those with uploaded files
    for (const [index, image] of images.entries()) {
      if (!processedIndices.has(index) && image.image_url) {
        if (/\.(jpg|jpeg|png|gif|webp)$/.test(image.image_url)) {
          // Handle valid URL
          await CarImage.create({
            car_id: car.id,
            image_url: image.image_url,
          });
        } else {
          // Handle invalid URL format
          return res
            .status(400)
            .json({ error: "Vui lòng nhập link hình ảnh đúng định dạng" });
        }
      }
    }

    // Retrieve the updated car with associated data
    const updatedCar = await Car.findOne({
      where: { id: carId },
      include: [
        {
          model: Brand,
          as: "brand",
          attributes: ["name"],
        },
        {
          model: CarType,
          as: "type",
          attributes: ["name"],
        },
        {
          model: CarImage,
          as: "images",
          attributes: ["image_url"],
        },
      ],
    });

    return res.status(200).json({ data: updatedCar });
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    return res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật xe" });
  }
};
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({
      attributes: ["id", "name"],
    });
    return res.status(200).json({ data: brands });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllTypes = async (req, res) => {
  try {
    const types = await CarType.findAll({
      attributes: ["id", "name"],
    });
    return res.status(200).json({ data: types });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
