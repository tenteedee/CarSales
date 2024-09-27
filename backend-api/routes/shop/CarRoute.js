import express from 'express';
import {
  getAllCars,
  getCarById,
  filterCars,
  createNewCar,
  deleteCar,
  updateCar,
  getAllBrands,
  getAllTypes,
} from '../../controllers/shop/CarController.js';

const route = express.Router();
route.route('/all').get(getAllCars);
route.route('/brand').get(getAllBrands);
route.route('/type').get(getAllTypes);
route.route('/detail/:id').get(getCarById).delete(deleteCar).patch(updateCar);
route.route('/search').get(filterCars);
route.route('/create').post(createNewCar);

export default route;
