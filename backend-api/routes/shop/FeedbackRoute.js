import express from 'express';
import {
  createFeedback,
  getFeedbackByCarId,
} from '../../controllers/shop/FeedbackController.js';
import { verifyToken } from '../../middleware/Auth.js';

const route = express.Router();
route.post('/create', verifyToken, createFeedback);
route.get('/car/:car_id', getFeedbackByCarId);

export default route;
