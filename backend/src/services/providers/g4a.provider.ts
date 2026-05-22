// backend/src/services/providers/g4a.provider.ts
import axios from 'axios';
import { decrypt } from '../../utils/encryption';

export const g4aProvider = {
  async sendOrder(apiKeyEncrypted: string, productCode: string, quantity: number, orderId: string, metadata: any) {
    const apiKey = decrypt(apiKeyEncrypted);
    const response = await axios.post('https://api.g4a.com/order', {
      apikey: apiKey,
      item: productCode,
      qty: quantity,
      ref: orderId,
      extra: metadata
    }, { timeout: 15000 });
    return { success: response.data.ok === true, data: response.data };
  }
};