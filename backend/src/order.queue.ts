// backend/src/queues/order.queue.ts
import { Queue, Worker } from 'bullmq';
import { redis } from '../config/redis';
import { processOrderJob } from './workers/order.worker';

export const orderQueue = new Queue('order-queue', { connection: redis });

export const orderWorker = new Worker('order-queue', async (job) => {
  await processOrderJob(job.data);
}, { connection: redis });