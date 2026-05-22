// backend/src/services/orderService.ts
import { prisma } from '../config/database';
import { balanceService } from './balanceService';
import { orderQueue } from '../queues/order.queue';

export class OrderService {
  async createOrderFromBalance(userId: string, productId: string, quantity: number, metadata: any, ip: string) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error('Product not found');
    const total = product.price * quantity;

    const order = await balanceService.debitWithLock(userId, total, async (user) => {
      const newOrder = await prisma.order.create({
        data: {
          userId,
          productId,
          quantity,
          totalAmount: total,
          paymentMethod: 'balance',
          status: 'processing',
          executionModeUsed: product.executionMode,
          metadata,
        },
      });
      await prisma.balanceTransaction.create({
        data: {
          userId,
          amount: -total,
          balanceAfter: user.balance - total,
          type: 'purchase',
          referenceId: newOrder.id,
          ipAddress: ip,
        },
      });
      return newOrder;
    });
    await orderQueue.add('process-order', { orderId: order.id });
    return order;
  }
}

export const orderService = new OrderService();