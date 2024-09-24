import express from 'express';
import {
  getAllCars,
  getCarById,
  filterCars,
  createNewCar,
  deleteCar,
  updateCar,
} from '../../controllers/shop/CarController.js';

const route = express.Router();
route.route('/all').get(getAllCars);
route.route('/detail/:id').get(getCarById).delete(deleteCar).patch(updateCar);
route.route('/search').get(filterCars);
route.route('/create').post(createNewCar);

export default route;