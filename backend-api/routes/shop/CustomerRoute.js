import express from 'express';
import {
  getCustomerProfile,
  updateProfile,
} from '../../controllers/shop/CustomerController.js';
import { verifyToken } from '../../middleware/Auth.js';

const router = express.Router();
router.route('/profile').get(verifyToken, getCustomerProfile);
router.put('/profile/update', updateProfile);

export default router;
