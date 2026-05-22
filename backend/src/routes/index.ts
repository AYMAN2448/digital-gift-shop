import { Router } from 'express';
import ordersRoutes from './v1/orders.routes';
import balanceRoutes from './v1/balance.routes';
import productsRoutes from './v1/products.routes';
import adminRoutes from './v1/admin.routes';
import webhooksRoutes from './v1/webhooks.routes';

const router = Router();
router.use('/orders', ordersRoutes);
router.use('/balance', balanceRoutes);
router.use('/products', productsRoutes);
router.use('/admin', adminRoutes);
router.use('/webhooks', webhooksRoutes);
export default router;
