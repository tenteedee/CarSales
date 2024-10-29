import express from 'express';
import { getNews, queryNews } from '../../controllers/management/NewsController.js';
const router = express.Router();

// Route để lấy danh sách tin tức với phân trang và tìm kiếm
router.route('/list')
    .get(queryNews);
//Route để lấy chi tiết một tin tức
router.route('/details/:id')
    .get(getNews);

export default router;