import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
   
} from '../../controllers/shop/OrdersController.js';

const router = express.Router();
router.route('/create').post(createOrder);
router.route('/all').get(getAllOrders);
router.route('/details/:id')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder);

export default router;