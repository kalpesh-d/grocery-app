'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const fetchProducts = useCallback(async (search = '', pageNum = 1) => {
    try {
      setIsLoading(true);
      const url = search
        ? `/api/products/search?q=${encodeURIComponent(search)}&page=${pageNum}`
        : `/api/products?page=${pageNum}`;
      const response = await fetch(url);
      const data = await response.json();

      const newProducts = search ? data.products : Array.isArray(data) ? data : data.products;

      if (!newProducts || newProducts.length === 0) {
        setHasMore(false);
        if (pageNum === 1) {
          setProducts([]);
        }
        return;
      }

      if (pageNum === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => {
          // Create a Set of existing product IDs for O(1) lookup
          const existingIds = new Set(prev.map(p => p._id.name));
          // Filter out duplicates based on _id.name
          const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p._id.name));
          return [...prev, ...uniqueNewProducts];
        });
      }

      setHasMore(newProducts.length === 8);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProducts('', 1);
  }, [fetchProducts]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        setPage(1);
        fetchProducts(searchTerm, 1);
      } else {
        setPage(1);
        fetchProducts('', 1);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, fetchProducts]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting && hasMore && !isLoading && products.length > 0) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(searchTerm, nextPage);
      }
    }, options);

    const currentLoader = loader.current;
    if (currentLoader && hasMore) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [fetchProducts, hasMore, isLoading, page, searchTerm, products.length]);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products && products.map((product, index) => (
            <ProductCard
              key={`${product._id}-${index}`}
              product={product}
              onViewHistory={setSelectedProduct}
            />
          ))}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {[...Array(8)].map((_, i) => <LoadingCard key={`loading-${i}`} />)}
          </div>
        )}

        {products.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        )}

        {/* Infinite scroll trigger element */}
        {hasMore && <div ref={loader} className="h-10" />}

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
