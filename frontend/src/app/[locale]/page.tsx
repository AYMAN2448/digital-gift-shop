'use client';
import { OneStepCheckout } from '@/components/checkout/one-step-checkout';
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const quantity = parseInt(searchParams.get('quantity') || '1');
  return <OneStepCheckout productId={productId} quantity={quantity} />;
}