// backend/src/services/payment/moyasar.service.ts
import axios from 'axios';

const SECRET_KEY = process.env.MOYASAR_SECRET_KEY;
const BASE_URL = 'https://api.moyasar.com/v1';

export const createMoyasarPayment = async (amount: number, source: string, description: string) => {
  const auth = Buffer.from(`${SECRET_KEY}:`).toString('base64');
  const response = await axios.post(`${BASE_URL}/payments`, {
    amount: amount * 100, // to halalas
    currency: 'SAR',
    source: { type: source }, // 'mada', 'applepay', 'stcpay'
    description
  }, { headers: { Authorization: `Basic ${auth}` } });
  return response.data;
};