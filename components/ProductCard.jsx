'use client';
import Image from 'next/image';
import { CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

export default function ProductCard({ product, onViewHistory }) {
  const lowestPrice = Math.min(...product.prices.map(p => p.price));

  return (
    <div className="group relative bg-white hover:bg-gray-50 rounded-xl border border-gray-100 
      transition-all duration-300 hover:shadow-lg overflow-hidden">
      <div className="relative h-40 w-full bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={() => onViewHistory(product)}
          className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-lg
            transition-colors duration-200 backdrop-blur-sm hover:shadow-md"
          title="View Price History"
        >
          <TrendingUp className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="p-3">
        <div className="mb-2">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h2 className="text-base font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h2>
          </div>
          <span className="inline-flex text-[11px] px-1.5 py-0.5 rounded-full 
            bg-gray-100 text-gray-600 font-medium tracking-wide uppercase">
            {product.category}
          </span>
        </div>

        <div className="space-y-1">
          {product.prices
            .sort((a, b) => a.price - b.price)
            .map((price, index) => (
              <PriceRow
                key={index}
                price={price}
                isLowestPrice={price.price === lowestPrice}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function PriceRow({ price, isLowestPrice }) {
  return (
    <div className="flex items-center justify-between py-1 px-1.5 rounded-md 
      hover:bg-gray-50/80 transition-colors duration-200">
      <span className="text-xs font-medium text-gray-600">{price.store}</span>
      <div className="flex items-center gap-1.5">
        <span className={`text-sm tabular-nums font-semibold 
          ${isLowestPrice ? 'text-green-600' : 'text-gray-900'}`}>
          ${price.price.toFixed(2)}
        </span>
        {price.inStock ? (
          <span className="text-green-600 text-[10px] bg-green-50 px-1 py-0.5 rounded-full 
            font-medium inline-flex items-center gap-0.5 whitespace-nowrap">
            <CheckCircle2 className="w-2.5 h-2.5" />
            In Stock
          </span>
        ) : (
          <span className="text-red-600 text-[10px] bg-red-50 px-1 py-0.5 rounded-full 
            font-medium inline-flex items-center gap-0.5">
            <XCircle className="w-2.5 h-2.5" />
            Out
          </span>
        )}
      </div>
    </div>
  );
} 