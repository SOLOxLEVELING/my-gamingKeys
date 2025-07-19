import React, { useContext } from "react";
import { Star } from "lucide-react";
import { CartContext } from "./CartContext"; // Import CartContext

// A simple component to render star ratings
const Rating = ({ count = 5 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { imageUrl, name, rating, price } = product;
  const { addToCart } = useContext(CartContext); // Use CartContext

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden group transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 flex flex-col">
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x300/1a1a1a/ffffff?text=Image+Not+Found";
          }}
        />
      </div>
      <div className="p-4 text-left flex flex-col flex-grow">
        <h3 className="text-white font-semibold truncate" title={name}>
          {name}
        </h3>
        <div className="mt-2 mb-3">
          <Rating count={rating} />
        </div>
        <p className="text-gray-300 font-bold text-lg mt-auto">{price}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-4 py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold text-center transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
