import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/products/product-detail';
import { fetchProductBySlug } from '@/lib/api-client';

export default async function ProductPage({ params }: { params: { slug: string; locale: string } }) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} locale={params.locale} />;
}
