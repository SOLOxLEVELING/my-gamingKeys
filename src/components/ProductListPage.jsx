import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { allProducts } from "../data/allProducts";

const ProductListPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    const productData = allProducts[category] || [];
    let sortedProducts = [...productData];

    const parsePrice = (price) => parseFloat(price.replace(/[^0-9.-]+/g, ""));

    if (sortType === "price-asc") {
      sortedProducts.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortType === "price-desc") {
      sortedProducts.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortType === "alpha-asc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "alpha-desc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setProducts(sortedProducts);
  }, [category, sortType]);

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header and Sorter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl tracking-wider uppercase">
          {categoryTitle}
        </h1>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="bg-[#2b2d31] border border-gray-700 rounded-lg text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="alpha-asc">Alphabetical: A-Z</option>
          <option value="alpha-desc">Alphabetical: Z-A</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
