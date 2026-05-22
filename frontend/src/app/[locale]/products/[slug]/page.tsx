export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/products/product-detail';

export default async function ProductPage({ params }: { params: { slug: string; locale: string } }) {
  // تأجيل جلب البيانات إلى وقت الطلب (Runtime) بدلاً من وقت البناء
  const { fetchProductBySlug } = await import('@/lib/api-client');
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} locale={params.locale} />;
}
