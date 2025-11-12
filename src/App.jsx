import { React, useEffect, useState } from "react"; // Import useState
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import KeyboardSection from "./components/KeyboardSection";
import MouseSection from "./components/MouseSection";
import DeskmatSection from "./components/DeskmatSection";
import ArticleSlider from "./components/ArticleSlider";
import AccountPage from "./components/AccountPage";
import CartPage from "./components/CartPage";
import Footer from "./components/Footer";
import { ToastProvider } from "./components/ToastContext";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import ProductListPage from "./components/ProductListPage";
import PreOrderPage from "./components/PreOrderPage";
import ContactPage from "./components/ContactPage";
import ProductDetailPage from "./components/ProductDetailPage";
import SearchModal from "./components/SearchModal"; // Import SearchModal
import Clarity from "@microsoft/clarity";

const Home = () => (
  <div className="flex flex-col items-center justify-center text-center gap-8">
    <Carousel />
    <KeyboardSection />
    <MouseSection />
    <DeskmatSection />
    <ArticleSlider />
  </div>
);

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search modal

  useEffect(() => {
    if (import.meta.env.MODE === "production") {
      Clarity.init(import.meta.env.VITE_CLARITY_ID);
    }
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="bg-black min-h-screen flex flex-col pt-20 overflow-hidden">
              {/* Pass handler to Navbar */}
              <Navbar onSearchClick={() => setIsSearchOpen(true)} />
              {/* Render SearchModal */}
              <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
              />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pre-order" element={<PreOrderPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route
                    path="/products/:category"
                    element={<ProductListPage />}
                  />
                  <Route
                    path="/product/:productId"
                    element={<ProductDetailPage />}
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
