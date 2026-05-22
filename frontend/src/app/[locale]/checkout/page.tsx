export const dynamic = 'force-dynamic';
'use client';
import { OneStepCheckout } from '@/components/checkout/one-step-checkout';
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const quantity = parseInt(searchParams.get('quantity') || '1');

  // إذا لم يكن productId موجوداً، نعرض رسالة خطأ
  if (!productId) {
    return <div className="text-center py-10 text-red-500">منتج غير موجود. الرجاء العودة إلى صفحة المنتجات.</div>;
  }

  return <OneStepCheckout productId={productId} quantity={quantity} />;
}
