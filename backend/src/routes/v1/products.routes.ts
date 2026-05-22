// backend/src/routes/v1/products.routes.ts
import { Router } from 'express';
import { getProducts, getProductBySlug } from '../../controllers/productController';

const router = Router();
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
export default router;