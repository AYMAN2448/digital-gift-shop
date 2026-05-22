import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { rateLimitMiddleware } from './middleware/rate-limit.middleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(rateLimitMiddleware);

// Routes
app.use('/api/v1', routes);

// Webhook endpoints need raw body for signature verification
app.use('/api/v1/webhooks', express.raw({ type: 'application/json' }), routes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});