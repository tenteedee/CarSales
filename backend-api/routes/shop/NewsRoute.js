import express from 'express';
import { getNewsById, queryNews } from '../../controllers/shop/NewsController.js';
const router = express.Router();

// Route để lấy danh sách tin tức với phân trang và tìm kiếm
router.route('/list')
    .get(queryNews);
//Route để lấy chi tiết một tin tức
router.route('/details/:id')
    .get(getNewsById);

export default router;