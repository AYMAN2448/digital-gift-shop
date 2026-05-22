// backend/src/services/referralService.ts
import { prisma } from '../config/database';

export class ReferralService {
  async addCommission(userId: string, depositAmount: number) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { referredBy: true } });
    if (!user?.referredBy) return;
    const commission = depositAmount * 0.10; // 10%
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.referredBy! },
        data: { balance: { increment: commission } },
      });
      await tx.balanceTransaction.create({
        data: {
          userId: user.referredBy!,
          amount: commission,
          balanceAfter: 0, // سيتم تحديثه لاحقاً
          type: 'commission',
          referenceId: userId,
          reason: `10% commission from deposit of user ${userId}`,
        },
      });
      await tx.referrals.create({
        data: {
          referrerId: user.referredBy!,
          referredId: userId,
          commissionAmount: commission,
          status: 'paid',
        },
      });
    });
  }
}

export const referralService = new ReferralService();