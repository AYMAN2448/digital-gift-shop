// backend/src/middleware/webhook-signature.middleware.ts
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const verifyWebhookSignature = (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['x-webhook-signature'] as string;
  const secret = process.env.WEBHOOK_SECRET;
  if (!signature || !secret) return res.status(401).send('Unauthorized');
  const expectedSignature = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');
  if (signature !== expectedSignature) return res.status(401).send('Invalid signature');
  next();
};