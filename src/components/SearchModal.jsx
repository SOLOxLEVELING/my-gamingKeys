import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Search } from "lucide-react";
import { allProducts } from "../data/allProducts"; // Your static import

// =================================================================
//  FIX: Move allProductData *outside* the component function
// =================================================================
const allProductData = [
    ...allProducts.keyboards,
    ...allProducts.mice,
    ...allProducts.deskmats,
];

const SearchModal = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    // (This variable is now defined above)

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setResults([]);
            return;
        }

        const filteredResults = allProductData.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
    }, [searchTerm]); // <-- Now, this dependency array is 100% correct!

    // Reset search term when the modal is closed
    useEffect(() => {
        if (!isOpen) {
            setSearchTerm("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // ... rest of your modal JSX (no changes needed)
        <div
            className="fixed inset-0 bg-black bg-opacity-80 z-[120] flex justify-center items-start pt-20"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl bg-[#1e1f22] rounded-lg shadow-lg p-6"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#2b2d31] border border-gray-700 rounded-lg text-white pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        autoFocus
                    />
                </div>

                {/* Results */}
                <div className="mt-6 max-h-[60vh] overflow-y-auto">
                    {results.length > 0 ? (
                        <div className="space-y-4">
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                    onClick={onClose} // Close modal on link click
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#2b2d31] transition-colors"
                                >
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>
                                        <p className="font-semibold text-white">{product.name}</p>
                                        <p className="text-gray-400">{product.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        searchTerm.trim() !== "" && (
                            <div className="text-center py-8 text-gray-400">
                                <p>No products found for "{searchTerm}"</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;