// backend/src/controllers/adminController.ts
import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const getPendingOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { status: 'pending_manual' },
    include: { user: { select: { email: true, name: true } }, product: true }
  });
  res.json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, providerResponse } = req.body;
  const order = await prisma.order.update({
    where: { id },
    data: { status, providerResponse }
  });
  if (status === 'completed') {
    // إشعار المستخدم (يمكن إضافة إرسال إيميل لاحقاً)
  }
  res.json(order);
};

export const updateProductExecutionMode = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { executionMode } = req.body;
  const product = await prisma.product.update({
    where: { id },
    data: { executionMode }
  });
  res.json(product);
};