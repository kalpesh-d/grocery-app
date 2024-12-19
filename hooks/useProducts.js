"use client";
import { useState, useMemo } from "react";
import { groceryProducts } from "../data/mockData";

export default function useProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return groceryProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return {
    products: filteredProducts,
    searchTerm,
    setSearchTerm,
  };
}
