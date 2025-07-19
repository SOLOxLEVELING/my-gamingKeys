import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { keyboardData } from "../data/allProducts"; // Import from new location

const KeyboardSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-wider uppercase">
            Keyboards
          </h2>
        </div>

        {/* Show only first 4 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {keyboardData.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products/keyboards"
            className="inline-block bg-cyan-600 text-white font-bold px-8 py-3 rounded-md transition-colors hover:bg-cyan-700"
          >
            View All Keyboards
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KeyboardSection;
