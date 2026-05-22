// backend/src/services/payment/nowpayments.service.ts
import axios from 'axios';

const API_KEY = process.env.NOWPAYMENTS_API_KEY;
const BASE_URL = 'https://api.nowpayments.io/v1';

export const createCryptoPayment = async (amount: number, currency: string = 'USD', orderId: string) => {
  const response = await axios.post(`${BASE_URL}/payment`, {
    price_amount: amount,
    price_currency: currency,
    pay_currency: 'USDT',
    order_id: orderId,
    ipn_callback_url: `${process.env.WEBHOOK_URL}/crypto`
  }, {
    headers: { 'x-api-key': API_KEY }
  });
  return response.data;
};