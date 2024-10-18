import express from 'express';
import {
    createOrder,
    getAllOrder,
    getOrderById,
    updateOrder,
    deleteOrder
} from '../../controllers/shop/OrdersController.js';

const router = express.Router();
router.route('/create').post(createOrder);
router.route('/all').get(getAllOrder);
router.route('/order/:id/details')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder);

export default router;