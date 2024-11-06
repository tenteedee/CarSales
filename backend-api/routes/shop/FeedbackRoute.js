import express from 'express';
import {
  createFeedback,
  getFeedbackByCarId,
} from '../../controllers/shop/FeedbackController.js';

const route = express.Router();
route.post('/create', createFeedback);
route.get('/car/:car_id', getFeedbackByCarId);

export default route;
