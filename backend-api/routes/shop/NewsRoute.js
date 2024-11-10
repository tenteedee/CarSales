import express from 'express';
import { getNews, queryNews, updateViewCount } from '../../controllers/shop/NewsController.js';
const router = express.Router();

// Route to get list of news with pagination and search
router.route('/list')
    .get(queryNews);

// Route to get details of a news article
router.route('/detail/:id')
    .get(getNews);

// Route to update the view count of a news article
router.route('/list/:id/views')
    .put(updateViewCount); // Add this line

export default router;
