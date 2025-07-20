import { React } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import KeyboardSection from "./components/KeyboardSection";
import MouseSection from "./components/MouseSection";
import DeskmatSection from "./components/DeskmatSection";
import ArticleSlider from "./components/ArticleSlider";
import AccountPage from "./components/AccountPage";
import CartPage from "./components/CartPage"; // Import CartPage
import Footer from "./components/Footer";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import { CartProvider } from "./components/CartContext"; // Import CartProvider
import ProductListPage from "./components/ProductListPage"; // Import the new page
import PreOrderPage from "./components/PreOrderPage"; // Import new Pre-order page
import ContactPage from "./components/ContactPage";
import ProductDetailPage from "./components/ProductDetailPage";

// --- Page Components ---

const Home = () => (
  <div className="flex flex-col items-center justify-center text-center gap-8">
    <Carousel />
    <KeyboardSection />
    <MouseSection />
    <DeskmatSection />
    <ArticleSlider />
    <Footer />
  </div>
);

// --- Main App Component ---

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="bg-black min-h-screen pt-20">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pre-order" element={<PreOrderPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/cart" element={<CartPage />} />{" "}
                {/* Add cart route */}
                {/* Add new product page route */}
                <Route
                  path="/products/:category"
                  element={<ProductListPage />}
                />
                <Route
                  path="/product/:productId"
                  element={<ProductDetailPage />}
                />{" "}
                {/* ADD THIS LINE */}
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
