// backend/src/controllers/balanceController.ts
import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { balanceService } from '../services/balanceService';

export const getBalance = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { balance: true } });
  res.json({ balance: user?.balance || 0 });
};

export const depositBalance = async (req: Request, res: Response) => {
  const { amount, paymentMethod, receiptImage } = req.body;
  const userId = (req as any).user.id;
  if (paymentMethod === 'bank_transfer') {
    const depositReq = await prisma.depositRequest.create({
      data: { userId, amount, paymentMethod: 'bank_transfer', receiptImageUrl: receiptImage, status: 'pending' }
    });
    return res.json({ message: 'تم استلام طلب الشحن، سيتم مراجعته قريباً', depositRequestId: depositReq.id });
  }
  // باقي طرق الدفع (crypto, vodafone, mada) سيتم التعامل معها عبر webhook
  res.status(400).json({ error: 'طريقة دفع غير مدعومة مباشرة، استخدم webhook' });
};

export const getTransactions = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const transactions = await prisma.balanceTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50
  });
  res.json(transactions);
};