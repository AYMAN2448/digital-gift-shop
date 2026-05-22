import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { balanceService } from '../services/balanceService';
import { orderQueue } from '../queues/order.queue';

export const createOrder = async (req: Request, res: Response) => {
  const { productId, quantity, paymentMethod, metadata } = req.body;
  const userId = (req as any).user.id;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { productProviders: { include: { provider: true } } }
  });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (!product.isActive) return res.status(400).json({ error: 'Product unavailable' });

  const totalAmount = product.price * quantity;

  // حالة الدفع بالرصيد الداخلي
  if (paymentMethod === 'balance') {
    try {
      const order = await balanceService.debitWithLock(userId, totalAmount, async (user) => {
        const newOrder = await prisma.order.create({
          data: {
            userId,
            productId,
            quantity,
            totalAmount,
            paymentMethod: 'balance',
            status: 'processing',
            executionModeUsed: product.executionMode,
            metadata
          }
        });
        await prisma.balanceTransaction.create({
          data: {
            userId,
            amount: -totalAmount,
            balanceAfter: user.balance - totalAmount,
            type: 'purchase',
            referenceId: newOrder.id,
            ipAddress: req.ip
          }
        });
        return newOrder;
      });
      // إضافة المهمة إلى Queue
      await orderQueue.add('process-order', { orderId: order.id });
      return res.json({ orderId: order.id, status: 'processing' });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  } 
  else {
    // طرق دفع خارجية: سننشئ طلب شحن رصيد أولاً (بنفس المبلغ) ثم بعد تأكيد الدفع يتم إنشاء الطلب تلقائياً
    const depositRequest = await prisma.depositRequest.create({
      data: {
        userId,
        amount: totalAmount,
        paymentMethod,
        status: 'pending',
        metadata: { productId, quantity, metadata, action: 'purchase' } // حفظ سياق الشراء
      }
    });
    // توليد رابط الدفع حسب البوابة (سيتم في خدمة منفصلة)
    const paymentUrl = await generatePaymentUrl(depositRequest, paymentMethod);
    return res.json({ depositRequestId: depositRequest.id, paymentUrl });
  }
};

async function generatePaymentUrl(deposit: any, method: string): Promise<string> {
  // مثال: استخدام NowPayments للعملات الرقمية
  if (method === 'usdt' || method === 'btc') {
    // استدعاء NowPayments API
    return `https://nowpayments.io/payment/${deposit.id}`;
  }
  // بخلاف ذلك إرجاع رابط وهمي
  return `https://example.com/pay/${deposit.id}`;
}

export const getUserOrders = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const orders = await prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  res.json(orders);
};

export const getOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ status: order.status });
};