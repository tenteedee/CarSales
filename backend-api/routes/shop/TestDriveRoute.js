import express from 'express';
import {
  getAllTestDriveRequests,
  getTestDriveRequestByCustomerId,
  getTestDriveRequestById,
  requestTestDrive,
} from '../../controllers/shop/TestDrive.js';

const router = express.Router();
router.route('/request').post(requestTestDrive);
router.route('/view').get(getTestDriveRequestByCustomerId);
router.route('/all').get(getAllTestDriveRequests);
router.route('/detail/:id').get(getTestDriveRequestById);

export default router;
