import express from 'express';
import { getCustomerProfile } from '../../controllers/shop/CustomerController.js';
import { verifyToken } from '../../middleware/Auth.js';

const router = express.Router();
router.route('/profile').get(verifyToken, getCustomerProfile);

export default router;
