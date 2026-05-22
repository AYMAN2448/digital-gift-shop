'use client';
import { useState } from 'react';
import apiClient from '@/lib/api-client';
import { useRouter } from 'next/navigation';

export function OneStepCheckout({ productId, quantity }: { productId: string; quantity: number }) {
  const [paymentMethod, setPaymentMethod] = useState('balance');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient.post('/orders', { productId, quantity, paymentMethod });
      if (paymentMethod === 'balance') {
        router.push(`/dashboard?orderId=${res.data.orderId}`);
      } else {
        window.location.href = res.data.paymentUrl;
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">إتمام الشراء</h2>
      <div>
        <label className="block mb-2">طريقة الدفع</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded">
          <option value="balance">رصيد الموقع (أسرع)</option>
          <option value="usdt">عملات رقمية (USDT)</option>
          <option value="bank_transfer">تحويل بنكي</option>
          <option value="vodafone_cash">فودافون كاش</option>
          <option value="mada">بطاقة Mada</option>
        </select>
      </div>
      <button type="submit" disabled={loading} className="w-full bg-primary text-white p-2 rounded">
        {loading ? 'جاري المعالجة...' : 'شراء الآن'}
      </button>
    </form>
  );
}
