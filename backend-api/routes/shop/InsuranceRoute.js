import express from 'express';
import {
  getAllInsuranceProviders,
  getAllInsurances,
} from '../../controllers/shop/InsuranceController.js';

const router = express.Router();
router.route('/providers').get(getAllInsuranceProviders);
router.route('/all').get(getAllInsurances);

export default router;
