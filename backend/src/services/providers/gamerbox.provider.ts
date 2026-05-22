// backend/src/services/providers/gamerbox.provider.ts
import axios from 'axios';
import { decrypt } from '../../utils/encryption';

export const gamerboxProvider = {
  async sendOrder(apiKeyEncrypted: string, productCode: string, quantity: number, orderId: string, metadata: any) {
    const apiKey = decrypt(apiKeyEncrypted);
    const response = await axios.post('https://api.gamerbox.com/v1/order', {
      api_key: apiKey,
      product_code: productCode,
      quantity,
      order_id: orderId,
      custom_fields: metadata
    }, { timeout: 15000 });
    return { success: response.data.status === 'success', data: response.data };
  }
};