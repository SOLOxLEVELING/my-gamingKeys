import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";

const NavItem = ({ to, children, onClick }) => (
  <li className="relative text-lg list-none">
    <Link
      to={to}
      onClick={onClick}
      className="relative cursor-pointer group text-white inline-block px-2 py-1"
    >
      {children}
      <span className="pointer-events-none absolute top-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100 origin-left" />
    </Link>
  </li>
);

const Navbar = ({ onSearchClick }) => { // Accept onSearchClick prop
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { label: "Pre-order", path: "/pre-order" },
    { label: "Home", path: "/" },
    { label: "Keyboard", path: "/products/keyboards" },
    { label: "Mouse", path: "/products/mice" },
    { label: "Deskmat", path: "/products/deskmats" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] px-4 sm:px-8 py-4 bg-black text-white">
      <div className="flex items-center justify-between">
        {/* Part 1: Logo (Left) */}
        <div className="flex-1">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <img
              src="/logo.svg"
              alt="MyGamingKeys Logo"
              className="h-8 w-auto"
            />
            <span className="hidden sm:inline">MyGamingKeys</span>
          </Link>
        </div>

        {/* Mobile & Tablet: Hamburger Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Part 2: Desktop Centered Navigation */}
        <ul className="hidden lg:flex justify-center items-center gap-8 flex-1">
          {navItems.map((item) => (
            <NavItem key={item.label} to={item.path}>
              {item.label}
            </NavItem>
          ))}
        </ul>

        {/* Part 3: Desktop Action Icons (Right) */}
        <div className="hidden lg:flex flex-1 items-center justify-end gap-6">
          <button
            onClick={onSearchClick} // Trigger search modal
            className="relative cursor-pointer group text-white p-1"
          >
            <Search />
          </button>

          {user ? (
            <div className="relative text-lg group">
              <div className="flex items-center gap-2 cursor-pointer text-white p-1">
                <User />
              </div>
              <div className="absolute top-full right-0 hidden group-hover:block bg-[#1e1f22] border border-gray-800 rounded-md shadow-lg py-2 w-48 z-10">
                <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700 truncate">
                  {user.name || user.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavItem to="/account">
              <User />
            </NavItem>
          )}

          <Link
            to="/cart"
            className="relative flex items-center gap-2 cursor-pointer group text-white p-1"
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile & Tablet Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-black absolute top-full left-0 w-full h-screen z-[110]">
          <ul className="flex flex-col items-center gap-6 pt-8">
            {navItems.map((item) => (
              <NavItem key={item.label} to={item.path} onClick={closeMenu}>
                {item.label}
              </NavItem>
            ))}
            <div className="flex flex-col items-center gap-6 mt-6 border-t border-gray-700 pt-8 w-full max-w-xs">
              <button
                onClick={() => {
                  onSearchClick(); // Trigger search modal
                  closeMenu();
                }}
                className="relative flex items-center gap-2 cursor-pointer group text-white px-2 py-1"
              >
                <Search />
                <span>Search</span>
              </button>
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <User />
                    <span>{user.name || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 text-gray-300 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavItem to="/account" onClick={closeMenu}>
                  Account
                </NavItem>
              )}
              <Link
                to="/cart"
                onClick={closeMenu}
                className="relative flex items-center gap-2 cursor-pointer group text-white px-2 py-1"
              >
                <ShoppingCart />
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-8 bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
