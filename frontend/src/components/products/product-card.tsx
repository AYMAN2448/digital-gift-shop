// frontend/src/components/products/product-card.tsx
import Link from 'next/link';

export function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/en/products/${product.slug}`} className="block border rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{product.nameEn || product.nameAr}</h3>
      <p className="text-muted-foreground text-sm mt-1">{product.category}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-primary">${product.price}</span>
        <button className="bg-primary text-white px-3 py-1 rounded text-sm">Buy</button>
      </div>
    </Link>
  );
}
