import express from 'express';
import { createOrder, getOrderConfirmation, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/shop/OrdersController.js';

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/confirmation/:id', getOrderConfirmation);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;