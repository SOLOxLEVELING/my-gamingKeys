import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link
import { Star } from "lucide-react";
import { CartContext } from "./CartContext";

const ProductCard = ({ product }) => {
  const { name, rating, price } = product;
  const { addToCart } = useContext(CartContext);

  const handleQuickAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation();
    // Note: This adds the default product variant.
    // A more complex implementation might open a modal to select variants.
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    // Wrap the entire card in a Link component
    <Link
      to={`/product/${product.id}`}
      className="block bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden group transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={product.imageUrl}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 text-left flex flex-col flex-grow">
        <h3 className="text-white font-semibold truncate" title={name}>
          {name}
        </h3>
        <div className="mt-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-gray-300 font-bold text-lg mt-auto">{price}</p>
        <button
          onClick={handleQuickAddToCart}
          className="w-full mt-4 py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold text-center transition-colors duration-300 opacity-0 group-hover:opacity-100"
        >
          Quick Add
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
