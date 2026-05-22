// frontend/src/components/products/product-detail.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export function ProductDetail({ product, locale }: { product: any; locale: string }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{locale === 'ar' ? product.nameAr : product.nameEn}</h1>
      <p className="text-muted-foreground mb-6">{product.category}</p>
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-3xl font-bold text-primary">${product.price}</span>
      </div>
      <div className="flex items-center gap-4 mb-8">
        <label className="text-sm font-medium">Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1"
        />
      </div>
      <Link
        href={`/${locale}/checkout?productId=${product.id}&quantity=${quantity}`}
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg inline-block"
      >
        Buy Now
      </Link>
    </div>
  );
}
