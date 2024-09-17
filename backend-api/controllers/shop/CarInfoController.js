import Car from '../../models/Car.js';
import CarImage from '../../models/CarImage.js';

export const getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findByPk(carId, {
      include: [
        {
          model: CarImage,
          as: 'images',
          attributes: ['id', 'image_url'],
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
