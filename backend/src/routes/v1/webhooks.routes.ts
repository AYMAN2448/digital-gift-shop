// backend/src/routes/v1/webhooks.routes.ts
import { Router } from 'express';
import { providerWebhook, cryptoWebhook, vodafoneWebhook } from '../../controllers/webhookController';
import { verifyWebhookSignature } from '../../middleware/webhook-signature.middleware';

const router = Router();
router.post('/provider', verifyWebhookSignature, providerWebhook);
router.post('/crypto', cryptoWebhook);
router.post('/vodafone', vodafoneWebhook);
export default router;