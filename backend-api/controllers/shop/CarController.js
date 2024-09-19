import Car from '../../models/Car.js';
import CarImage from '../../models/CarImage.js';
import { Op } from 'sequelize';

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll({
      attributes: ['id', 'model', 'brand', 'type', 'price', 'stock'],
      include: [
        {
          model: CarImage,
          as: 'images',
          attributes: ['image_url'],
        },
      ],
    });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: 'No cars found!' });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findByPk(carId, {
      attributes: [
        'id',
        'model',
        'brand',
        'type',
        'price',
        'description',
        'stock',
      ],
      include: [
        {
          model: CarImage,
          as: 'images',
          attributes: ['image_url'],
        },
      ],
    });

    if (!car) {
      return res.status(404).json({
        message: 'Car not found',
      });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

export const filterCars = async (req, res) => {
  try {
    const { type, minPrice, maxPrice } = req.query;
    console.log('req.query:', req.query);

    let searchFields = {};

    if (type) {
      searchFields.type = type.toLowerCase().trim();
    }

    if (minPrice && maxPrice) {
      searchFields.price = {
        [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)],
      };
    } else if (minPrice) {
      searchFields.price = {
        [Op.gte]: parseFloat(minPrice),
      };
    } else if (maxPrice) {
      searchFields.price = {
        [Op.lte]: parseFloat(maxPrice),
      };
    }

    const cars = await Car.findAll({
      where: searchFields,
      // where: {
      //   type: 'suv',
      //   price: {
      //     [Op.between]: [1000, 10000],
      //   },
      // },
      attributes: ['id', 'model', 'brand', 'type', 'price', 'stock'],
      include: [
        {
          model: CarImage,
          as: 'images',
          attributes: ['image_url'],
        },
      ],
    });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: 'No cars found!' });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewCar = async (req, res) => {
  try {
    const { model, brand, type, price, description, stock, images } = req.body;

    const existingCar = await Car.findOne({ where: { model, brand, type } });
    if (existingCar) {
      return res
        .status(400)
        .json({ error: 'Car already exists in the system!' });
    }

    const newCar = await Car.create({
      model,
      brand,
      type: type.toLowerCase(),
      price,
      description,
      stock,
    });

    if (images && images.length > 0) {
      for (const image of images) {
        await CarImage.create({
          car_id: newCar.id,
          image_url: image,
        });
      }
    }

    res.status(201).json({ message: 'Car created successfully!' });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findByPk(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    } else {
      await car.destroy();
    }

    res.status(200).json({ message: 'Car deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const { model, brand, type, price, stock } = req.body;

    const car = await Car.findByPk(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.model = model || car.model;
    car.brand = brand || car.brand;
    car.type = type || car.type;
    car.price = price || car.price;
    car.stock = stock || car.stock;

    await car.save();

    res.status(200).json({ message: 'Car updated successfully', car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
