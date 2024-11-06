import express from 'express';
import authRouter from './AuthRoute.js';
import carRouter from './CarRoute.js';
import customerRouter from './CustomerRoute.js';
import testDriveRouter from './TestDriveRoute.js';
import { getAllSettings } from '../../controllers/shop/SettingController.js';
import { verifyToken } from '../../middleware/Auth.js';
import showroomRouter from './ShowroomRoute.js';
import staffRouter from './StaffRoute.js';
import OrderRouter from './OrderRoute.js';
import newsRouter from './NewsRoute.js';
import InsuranceRouter from './InsuranceRoute.js';
import FeedbackRouter from './FeedbackRoute.js';
import {
  getChatResponse,
  getChatResponseTogetherAI,
} from '../../controllers/shop/ChatbotController.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/car', carRouter);
router.use('/customer', customerRouter);
router.use('/test-drive', testDriveRouter);
router.use('/showroom', showroomRouter);
router.use('/staff', staffRouter);
router.use('/order', OrderRouter);
router.use('/insurance', InsuranceRouter);
router.use('/news', newsRouter);
router.use('/feedback', FeedbackRouter);

router.get('/settings', getAllSettings);
router.post('/chat', getChatResponseTogetherAI);

export default router;
