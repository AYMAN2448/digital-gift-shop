import { ProductGrid } from '@/components/products/product-grid';
import { fetchProducts } from '@/lib/api-client';

export default async function HomePage() {
  const products = await fetchProducts(); // تنفيذها لاحقاً
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-10">
        <h1 className="text-3xl md:text-5xl font-bold">أسرع شحن للبطاقات والألعاب</h1>
        <p className="text-muted-foreground">Google Play, Steam, PUBG UC, Free Fire Diamonds والمزيد</p>
      </section>
      <ProductGrid products={products} />
    </div>
  );
}