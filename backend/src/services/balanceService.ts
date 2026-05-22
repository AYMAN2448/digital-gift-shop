import { prisma } from '../config/database';

export const balanceService = {
  async debitWithLock(userId: string, amount: number, callback: (user: any) => Promise<any>) {
    return await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { id: true, balance: true }
      });
      if (!user || user.balance < amount) throw new Error('Insufficient balance');
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: amount } }
      });
      const result = await callback(user);
      return result;
    });
  },

  async refund(userId: string, amount: number, orderId: string, reason?: string) {
    return await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } }
      });
      await tx.balanceTransaction.create({
        data: {
          userId,
          amount,
          balanceAfter: user.balance,
          type: 'refund',
          referenceId: orderId,
          reason: reason || 'Provider failed'
        }
      });
    });
  },

  async credit(userId: string, amount: number, referenceId: string, type: string, ip?: string) {
    return await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } }
      });
      await tx.balanceTransaction.create({
        data: {
          userId,
          amount,
          balanceAfter: user.balance,
          type,
          referenceId,
          ipAddress: ip
        }
      });
    });
  }
};
