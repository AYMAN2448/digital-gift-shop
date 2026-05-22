// backend/src/queues/workers/order.worker.ts
import { Worker } from 'bullmq';
import { prisma } from '../../config/database';
import { fallbackManager } from '../../services/providers/fallback.manager';

const orderWorker = new Worker('order-queue', async (job) => {
  const { orderId, attempt = 1 } = job.data;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { product: { include: { productProviders: true } } }
  });
  if (order.product.execution_mode === 'manual') {
    await prisma.order.update({ where: { id: orderId }, data: { status: 'pending_manual' } });
    return;
  }
  const success = await fallbackManager.execute(order);
  if (!success && attempt < 3) throw new Error(`Retry ${attempt}`);
  if (!success) {
    await balanceService.refund(order.userId, order.totalAmount, order.id);
    await prisma.order.update({ where: { id: orderId }, data: { status: 'failed' } });
  }
}, { connection: { host: 'localhost', port: 6379 }, settings: { backoffStrategy: (attempts) => Math.min(5000 * Math.pow(2, attempts), 60000) } });
