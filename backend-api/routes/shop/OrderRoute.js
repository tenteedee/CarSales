import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderHistory,
   
} from '../../controllers/shop/OrdersController.js';
import { verifyToken } from '../../middleware/Auth.js';

const router = express.Router();
router.route('/create').post(createOrder);
router.route('/all').get(getAllOrders);
router.route('/details/:id')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder);
    router.route('/order-history').get(verifyToken, getOrderHistory);
    export default router;