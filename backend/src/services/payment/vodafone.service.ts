// backend/src/services/payment/vodafone.service.ts
// في الواقع تحتاج API حقيقي من Vodafone، لكن هنا نموذج
export const requestVodafonePayment = async (phoneNumber: string, amount: number, referenceId: string) => {
  // محاكاة استدعاء API
  return { success: true, transactionId: `VOD${Date.now()}` };
};