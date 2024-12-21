'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import PriceHistoryModal from '../components/PriceHistoryModal';
import LoadingCard from '../components/LoadingCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async (search = '') => {
    try {
      setIsLoading(true);
      const url = search
        ? `http://localhost:3000/api/products/search?q=${encodeURIComponent(search)}`
        : 'http://localhost:3000/api/products';
      const response = await fetch(url);
      const data = await response.json();
      setProducts(search ? data.products : data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        fetchProducts(searchTerm);
      } else {
        fetchProducts();
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, fetchProducts]);

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
            {[...Array(8)].map((_, i) => <LoadingCard key={`loading-${i}`} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products && products.map((product, index) => (
              <ProductCard
                key={`${product._id}-${index}`}
                product={product}
                onViewHistory={setSelectedProduct}
              />
            ))}
          </div>
        )}

        {products.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        )}

        {selectedProduct && (
          <PriceHistoryModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </main>
  );
}
