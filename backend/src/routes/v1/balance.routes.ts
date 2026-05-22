// backend/src/routes/v1/balance.routes.ts
import { Router } from 'express';
import { getBalance, depositBalance, getTransactions } from '../../controllers/balanceController';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
router.get('/', authMiddleware, getBalance);
router.post('/deposit', authMiddleware, depositBalance);
router.get('/transactions', authMiddleware, getTransactions);
export default router;