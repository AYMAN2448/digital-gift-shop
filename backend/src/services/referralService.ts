import { prisma } from '../config/database';

export class ReferralService {
  async addCommission(userId: string, depositAmount: number) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { referredBy: true } });
    if (!user?.referredBy) return;
    const commission = depositAmount * 0.10;
    await prisma.$transaction(async (tx: any) => {
      await tx.user.update({
        where: { id: user.referredBy! },
        data: { balance: { increment: commission } }
      });
      await tx.balanceTransaction.create({
        data: {
          userId: user.referredBy!,
          amount: commission,
          balanceAfter: 0,
          type: 'commission',
          referenceId: userId,
          reason: `10% commission from deposit`
        }
      });
      await tx.referral.create({  // تأكد من استخدام `referral` وليس `referrals`
        data: {
          referrerId: user.referredBy!,
          referredId: userId,
          commissionAmount: commission,
          status: 'paid'
        }
      });
    });
  }
}

export const referralService = new ReferralService();
