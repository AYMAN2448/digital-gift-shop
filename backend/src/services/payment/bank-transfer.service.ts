// backend/src/services/payment/bank-transfer.service.ts
// لا توجد API، فقط تخزين الإيصالات
export const createBankTransferRequest = async (userId: string, amount: number, receiptUrl: string) => {
  // يتم التعامل معها في الـ controller
  return { status: 'pending' };
};
