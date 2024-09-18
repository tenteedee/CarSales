import express from 'express';
import {
  getCarById,
  filterCars,
} from '../../controllers/shop/CarController.js';

const route = express.Router();
route.route('/detail/:id').get(getCarById);
route.route('/search').get(filterCars);

export default route;
