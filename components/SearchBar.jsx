'use client';
import { Search } from 'lucide-react';

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-4 pl-12 rounded-2xl border-0 bg-white shadow-sm ring-1 ring-gray-200 
          focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder:text-gray-400"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
} 