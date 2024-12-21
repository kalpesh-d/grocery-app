'use client';
import { X, TrendingUp } from 'lucide-react';
import PriceHistoryChart from './PriceHistoryChart';

export default function PriceHistoryModal({ product, onClose }) {
  if (!product || !Array.isArray(product)) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                {product[0].name}
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-500">
                  Price trends across platforms
                </p>
                {product[0].variant && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                    {product[0].variant}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <PriceHistoryChart products={product} />
        </div>
      </div>
    </div>
  );
} 