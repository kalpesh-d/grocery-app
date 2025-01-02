'use client';
import Image from 'next/image';
import { CheckCircle2, XCircle, TrendingUp, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product, onViewHistory }) {
  const [imageError, setImageError] = useState(false);
  const lowestPrice = Math.min(...product.products.map(p => parseFloat(p.currentPrice.replace('₹', ''))));

  return (
    <div className="group relative bg-white hover:bg-gray-50 rounded-xl border border-gray-100 
      transition-all duration-300 hover:shadow-lg overflow-hidden">
      <div className="relative h-40 w-full bg-gray-100">
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <ShoppingBag className="w-12 h-12 text-gray-300 mb-2" />
            <span className="text-xs text-gray-500 px-4 text-center line-clamp-2">
              {product.products[0].name}
            </span>
          </div>
        ) : (
          <Image
            src={product.products[0].image}
            alt={product.products[0].name}
            priority={false}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            referrerPolicy="origin"
            crossOrigin="anonymous"
          />
        )}
        <button
          onClick={() => onViewHistory(product.products)}
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
              {product.products[0].name}
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex text-[11px] px-1.5 py-0.5 rounded-full 
              bg-gray-100 text-gray-600 font-medium tracking-wide uppercase">
              {product.products[0].category}
            </span>
            {product.products[0].variant && (
              <span className="inline-flex text-[11px] px-1.5 py-0.5 rounded-full 
                bg-blue-50 text-blue-600 font-medium tracking-wide">
                {product.products[0].variant}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          {product.products
            .sort((a, b) => parseFloat(a.currentPrice.replace('₹', '')) - parseFloat(b.currentPrice.replace('₹', '')))
            .map((platformProduct, index) => (
              <div
                key={`${platformProduct.platform}-${platformProduct._id.$oid || index}`}
                className="flex items-center justify-between py-1 px-1.5 rounded-md 
                hover:bg-gray-50/80 transition-colors duration-200"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-600">
                    {platformProduct.platform}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {platformProduct.variant}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="text-right">
                    <span className={`text-sm tabular-nums font-semibold 
                      ${parseFloat(platformProduct.currentPrice.replace('₹', '')) === lowestPrice ? 'text-green-600' : 'text-gray-900'}`}>
                      {platformProduct.currentPrice}
                    </span>
                    {platformProduct.actualPrice && (
                      <div className="flex items-center gap-1 justify-end">
                        <span className="text-[10px] text-gray-500 line-through">
                          {platformProduct.actualPrice}
                        </span>
                        <span className="text-[10px] text-green-600">
                          {Math.round(((parseFloat(platformProduct.actualPrice.replace('₹', '')) -
                            parseFloat(platformProduct.currentPrice.replace('₹', ''))) /
                            parseFloat(platformProduct.actualPrice.replace('₹', ''))) * 100)}% off
                        </span>
                      </div>
                    )}
                  </div>
                  {platformProduct.available ? (
                    <span className="text-green-600 text-[10px] bg-green-50 px-1 py-0.5 rounded-full 
                      font-medium inline-flex items-center gap-0.5">
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
            ))}
        </div>
      </div>
    </div>
  );
} 