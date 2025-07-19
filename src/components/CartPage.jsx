import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { X, Plus, Minus } from "lucide-react";

// This is the component with the buttons
const QuantityControl = ({ item }) => {
  const { updateQuantity } = useContext(CartContext);
  return (
    <div className="flex items-center border border-gray-700 rounded-md">
      <button
        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
        className="px-3 py-1 text-gray-400 hover:bg-gray-700 rounded-l-md"
      >
        <Minus size={16} />
      </button>
      <span className="px-4 py-1 border-x border-gray-700">
        {item.quantity}
      </span>
      <button
        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
        className="px-3 py-1 text-gray-400 hover:bg-gray-700 rounded-r-md"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const parsePrice = (priceStr) =>
    parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));

  const subtotal = cart.reduce((total, item) => {
    return total + parsePrice(item.price) * item.quantity;
  }, 0);

  const formattedSubtotal = `₹${subtotal.toFixed(2)}`;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <p className="text-gray-400 mb-8">Your cart is currently empty.</p>
        <Link
          to="/"
          className="inline-block bg-cyan-600 text-white font-bold px-8 py-3 rounded-md transition-colors hover:bg-cyan-700"
        >
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-2 bg-[#161616] p-6 rounded-lg border border-gray-800">
          <div className="flex justify-between border-b border-gray-700 pb-3 mb-4 text-sm font-semibold text-gray-400 uppercase">
            <span>Product</span>
            <span>Total</span>
          </div>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-6"
              >
                <div className="flex items-center gap-4 w-full sm:w-2/3">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-24 w-24 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.price}</p>
                    <div className="mt-2 sm:hidden">
                      <QuantityControl item={item} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-1/3">
                  <div className="hidden sm:block">
                    <QuantityControl item={item} />
                  </div>
                  <p className="font-bold w-24 text-right">
                    ₹{(parsePrice(item.price) * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="text-gray-500 hover:text-red-500 ml-4"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Cart Totals */}
        <div className="lg:col-span-1 bg-[#161616] p-6 rounded-lg border border-gray-800 sticky top-28">
          <h2 className="text-xl font-bold border-b border-gray-700 pb-3 mb-4">
            Cart Totals
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-semibold">{formattedSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Delivery</span>
              <span className="text-sm">Calculated at checkout</span>
            </div>
            <div className="flex justify-between border-t border-gray-700 pt-4 text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold">{formattedSubtotal}</span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Including all taxes
            </p>
          </div>
          <button className="w-full mt-6 py-3 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold text-center transition-colors duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
