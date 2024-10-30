import express from 'express';
import {
  getAllStaffs,
  getStaffById,
} from '../../controllers/shop/StaffController.js';

const route = express.Router();
route.route('/list').get(getAllStaffs);
route.route('/:id').get(getStaffById);

export default route;
