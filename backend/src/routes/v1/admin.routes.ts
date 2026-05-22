import { Router } from 'express';
import { adminMiddleware } from '../../middleware/auth.middleware';
import { updateOrderStatus, getPendingOrders, updateProductExecutionMode } from '../../controllers/adminController';

const router = Router();
router.use(adminMiddleware);
router.get('/orders/pending', getPendingOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.put('/products/:id/execution-mode', updateProductExecutionMode);
export default router;
