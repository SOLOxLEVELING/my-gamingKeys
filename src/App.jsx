import { React, useEffect } from "react";
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
import Footer from "./components/Footer"; // Keep this import
import { ToastProvider } from "./components/ToastContext";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import ProductListPage from "./components/ProductListPage";
import PreOrderPage from "./components/PreOrderPage";
import ContactPage from "./components/ContactPage";
import ProductDetailPage from "./components/ProductDetailPage";
import Clarity from "@microsoft/clarity";

// --- Page Components ---

// ✅ Footer has been removed from here.
const Home = () => (
  <div className="flex flex-col items-center justify-center text-center gap-8">
    <Carousel />
    <KeyboardSection />
    <MouseSection />
    <DeskmatSection />
    <ArticleSlider />
  </div>
);

// --- Main App Component ---

function App() {
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
            {/* Use flex-col and min-h-screen to make sure footer stays at the bottom */}
            <div className="bg-black min-h-screen flex flex-col pt-20">
              <Navbar />
              {/* flex-grow allows the main content to push the footer down */}
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
              {/* ✅ Footer is now part of the main layout, outside the content */}
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
