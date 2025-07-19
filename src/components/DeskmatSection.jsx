import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { deskmatData } from "../data/allProducts"; // Import from new location

const DeskmatSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-wider uppercase">
            Deskmats
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {deskmatData.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/products/deskmats"
            className="inline-block bg-cyan-600 text-white font-bold px-8 py-3 rounded-md transition-colors hover:bg-cyan-700"
          >
            View All Deskmats
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeskmatSection;
