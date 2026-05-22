import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { balanceService } from '../services/balanceService';

export const providerWebhook = async (req: Request, res: Response) => {
  const { orderId, status, error } = req.body;
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return res.status(404).send('Order not found');
  if (status === 'completed') {
    await prisma.order.update({ where: { id: orderId }, data: { status: 'completed' } });
  } else if (status === 'failed') {
    await balanceService.refund(order.userId, order.totalAmount, order.id, error);
    await prisma.order.update({ where: { id: orderId }, data: { status: 'failed' } });
  }
  res.sendStatus(200);
};

export const cryptoWebhook = async (req: Request, res: Response) => {
  const { payment_status, order_id } = req.body;
  if (payment_status === 'finished') {
    const depositReq = await prisma.depositRequest.findUnique({ where: { id: order_id } });
    if (depositReq && depositReq.status === 'pending') {
      await balanceService.credit(depositReq.userId, depositReq.amount, depositReq.id, 'deposit', req.ip);
      await prisma.depositRequest.update({ where: { id: order_id }, data: { status: 'approved' } });
    }
  }
  res.sendStatus(200);
};

export const vodafoneWebhook = async (req: Request, res: Response) => {
  res.sendStatus(200);
};
