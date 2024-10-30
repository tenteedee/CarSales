import express from 'express';
import {
  getStaff,
  getAllStaff,
} from '../../controllers/shop/StaffController.js';

const router = express.Router();
router.route('/get/:id').get(getStaff);
router.route('/all').get(getAllStaff);

export default router;
