import { prisma } from '../../config/database';
import axios from 'axios';
import { decrypt } from '../../utils/encryption';

export const fallbackManager = {
  async execute(order: any): Promise<boolean> {
    const productProviders = order.product.productProviders.sort((a: any, b: any) => a.provider.priority - b.provider.priority);
    for (const pp of productProviders) {
      try {
        const provider = pp.provider;
        const decryptedKey = decrypt(provider.apiKeyEncrypted);
        const payload = {
          api_key: decryptedKey,
          product_code: pp.providerProductCode,
          quantity: order.quantity,
          order_id: order.id,
          metadata: order.metadata
        };
        const response = await axios.post(`${provider.baseUrl}/order`, payload, { timeout: 15000 });
        if (response.data && response.data.success) {
          // حفظ استجابة المزود
          await prisma.order.update({
            where: { id: order.id },
            data: { providerId: provider.id, providerResponse: response.data }
          });
          return true;
        }
      } catch (err) {
        console.error(`Provider ${pp.provider.name} failed:`, err);
      }
    }
    return false;
  }
};