'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import PriceHistoryModal from '../components/PriceHistoryModal';
import LoadingCard from '../components/LoadingCard';
import useProducts from '../hooks/useProducts';

export default function Home() {
  const { products, searchTerm, setSearchTerm } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent 
            bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            Compare Grocery Prices
          </h1>
          <p className="text-gray-500">Find the best deals across local stores</p>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <LoadingCard key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewHistory={() => setSelectedProduct(product)}
                />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No products found matching your search.</p>
              </div>
            )}
          </>
        )}

        <PriceHistoryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </main>
  );
}
