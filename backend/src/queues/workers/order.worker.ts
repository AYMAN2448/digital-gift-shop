import { prisma } from '../../config/database';
import { balanceService } from '../../services/balanceService';
import { fallbackManager } from '../../services/providers/fallback.manager';

export async function processOrderJob(data: { orderId: string; attempt?: number }) {
  const { orderId, attempt = 1 } = data;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { product: { include: { productProviders: { include: { provider: true } } } } }
  });
  if (!order) throw new Error('Order not found');

  if (order.product.executionMode === 'manual') {
    await prisma.order.update({ where: { id: orderId }, data: { status: 'pending_manual' } });
    return;
  }

  const success = await fallbackManager.execute(order);
  if (success) {
    await prisma.order.update({ where: { id: orderId }, data: { status: 'completed' } });
  } else if (attempt < 3) {
    throw new Error(`Retry attempt ${attempt}`);
  } else {
    await balanceService.refund(order.userId, order.totalAmount, order.id, 'All providers failed after 3 retries');
    await prisma.order.update({ where: { id: orderId }, data: { status: 'failed' } });
  }
}
