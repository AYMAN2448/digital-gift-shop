import { Router } from 'express';
import { createOrder, getUserOrders, getOrderStatus } from '../../controllers/orderController';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderStatus);
export default router;