import express from 'express';
import authRouter from './AuthRoute.js';
import carRouter from './CarRoute.js';
import customerRouter from './CustomerRoute.js';
import testDriveRouter from './TestDriveRoute.js';
import { getAllSettings } from '../../controllers/shop/SettingController.js';
import { verifyToken } from '../../middleware/Auth.js';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/car', carRouter);
router.use('/customer', customerRouter);
router.use('/test-drive', testDriveRouter);

router.get('/settings', getAllSettings);

export default router;