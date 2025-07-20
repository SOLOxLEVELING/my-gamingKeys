import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/productDetails";
import { Star, Plus, Minus, Heart } from "lucide-react";
import { CartContext } from "./CartContext";

// --- Sub-components for better organization ---

const ProductGallery = ({ gallery, mainMedia, setMainMedia }) => (
  <div className="flex flex-col gap-4">
    <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-800">
      {mainMedia.type === "video" ? (
        <iframe
          className="w-full h-full"
          src={mainMedia.url}
          title="Product Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          src={mainMedia.url}
          alt="Main product view"
          className="w-full h-full object-cover"
        />
      )}
    </div>
    <div className="flex gap-2 justify-center">
      {gallery.map((media) => (
        <button
          key={media.id}
          onClick={() => setMainMedia(media)}
          className={`w-20 h-16 rounded-md overflow-hidden border-2 transition-all ${
            mainMedia.id === media.id ? "border-cyan-400" : "border-transparent"
          }`}
        >
          <img
            src={media.thumb}
            alt="Product thumbnail"
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  </div>
);

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  return (
    <div className="w-full mt-16">
      <div className="border-b border-gray-700">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-4 px-1 text-lg font-medium ${
              activeTab === "description"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`py-4 px-1 text-lg font-medium ${
              activeTab === "details"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Product Details
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-4 px-1 text-lg font-medium ${
              activeTab === "reviews"
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Reviews ({product.reviewsCount})
          </button>
        </nav>
      </div>
      <div className="py-8">
        {activeTab === "description" && (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        )}
        {activeTab === "details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {product.productDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex justify-between border-b border-gray-800 py-2"
              >
                <span className="text-gray-400">{detail.label}</span>
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-800 pb-6">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-4 font-bold">{review.author}</p>
                  <p className="ml-2 text-sm text-gray-500">- {review.date}</p>
                </div>
                <p className="text-gray-300">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---
const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products[productId];

  const [mainMedia, setMainMedia] = useState(product.gallery[0]);
  const [selectedSwitch, setSelectedSwitch] = useState(
    product.variants.switches[0]
  );
  const [selectedColor, setSelectedColor] = useState(
    product.variants.colors[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const basePrice = parseFloat(product.salePrice.replace(/[^0-9.-]+/g, ""));
    const modifier = selectedSwitch.priceModifier;
    setCurrentPrice(basePrice + modifier);
  }, [selectedSwitch, product.salePrice]);

  // ... (inside the ProductDetailPage component)

  const handleAddToCart = () => {
    // This is the product object we'll add
    const productInfo = {
      id: product.id,
      name: product.name,
      price: `₹${currentPrice.toFixed(2)}`,
      imageUrl: product.gallery.find((m) => m.type === "image")?.url,
    };

    // This is the specific variant information
    const variantInfo = `${selectedColor.name}, ${selectedSwitch.name}`;

    // Pass the product, quantity, and variant info to the context function
    addToCart(productInfo, quantity, variantInfo);
  };

  // ... (rest of the component)

  if (!product) {
    return (
      <div className="text-center py-20 text-white">Product not found.</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Media Gallery */}
        <ProductGallery
          gallery={product.gallery}
          mainMedia={mainMedia}
          setMainMedia={setMainMedia}
        />

        {/* Right Column: Product Info */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {product.name}
          </h1>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < product.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <a
              href="#reviews"
              className="ml-3 text-sm font-medium text-cyan-400 hover:text-cyan-300"
            >
              ({product.reviewsCount} reviews)
            </a>
          </div>

          <div className="mt-4">
            <span className="text-gray-500 line-through text-2xl">
              {product.originalPrice}
            </span>
            <span className="text-4xl font-bold ml-2">
              ₹{currentPrice.toFixed(2)}
            </span>
            <span className="text-green-400 text-sm ml-2">(incl. GST)</span>
          </div>

          <p className="text-sm text-gray-400 mt-2">{product.paymentInfo}</p>

          <ul className="mt-6 space-y-2 text-gray-300 list-disc list-inside">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          {/* Variants Selection */}
          <div className="mt-8">
            {/* Color Variants */}
            <div>
              <h3 className="text-lg font-medium">
                Color: <span className="font-normal">{selectedColor.name}</span>
              </h3>
              <div className="flex items-center gap-3 mt-2">
                {product.variants.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor.id === color.id
                        ? "border-cyan-400 scale-110"
                        : "border-gray-700"
                    }`}
                    style={{ backgroundColor: color.colorHex }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Switch Variants */}
            <div className="mt-6">
              <h3 className="text-lg font-medium">
                Key Switches:{" "}
                <span className="font-normal">{selectedSwitch.name}</span>
              </h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {product.variants.switches.map((sw) => (
                  <button
                    key={sw.id}
                    onClick={() => setSelectedSwitch(sw)}
                    className={`flex items-center gap-2 p-2 border-2 rounded-lg transition-all ${
                      selectedSwitch.id === sw.id
                        ? "border-cyan-400 bg-cyan-900/50"
                        : "border-gray-700 bg-[#161616]"
                    }`}
                  >
                    <img
                      src={sw.image}
                      alt={sw.name}
                      className="w-8 h-8 rounded"
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold">{sw.name}</p>
                      {sw.priceModifier > 0 && (
                        <p className="text-xs text-cyan-400">
                          + ₹{sw.priceModifier.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-gray-700 rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-3 border-x border-gray-700">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-3"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-cyan-600 text-white font-bold py-3 px-6 rounded-md transition-colors hover:bg-cyan-700"
            >
              Add to cart
            </button>
            <button className="p-3 border border-gray-700 rounded-md hover:bg-gray-800">
              <Heart />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <ProductTabs product={product} />
    </div>
  );
};

export default ProductDetailPage;
