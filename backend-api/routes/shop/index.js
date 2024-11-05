import express from 'express';
import authRouter from './AuthRoute.js';
import carRouter from './CarRoute.js';
import customerRouter from './CustomerRoute.js';
import testDriveRouter from './TestDriveRoute.js';
import { getAllSettings } from '../../controllers/shop/SettingController.js';
import { verifyToken } from '../../middleware/Auth.js';
import showroomRouter from './ShowroomRoute.js';
import OrderRouter from './OrderRoute.js';
import InsuranceRouter from './InsuranceRoute.js';

import newsRouter from './NewsRoute.js';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/car', carRouter);
router.use('/customer', customerRouter);
router.use('/test-drive', testDriveRouter);
router.use('/showroom', showroomRouter);
router.get('/settings', getAllSettings);
router.use('/order', OrderRouter);
router.use('/insurance', InsuranceRouter);
router.use('/news', newsRouter);
export default router;
