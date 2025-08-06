import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { ShoppingCart, User } from "lucide-react";

const NavItem = ({ to, children }) => (
  <li className="relative text-lg">
    <Link
      to={to}
      className="relative cursor-pointer group text-white inline-block px-2 py-1"
    >
      {children}
      <span className="pointer-events-none absolute top-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100 origin-left" />
    </Link>
  </li>
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // UPDATED navItems paths
  const navItems = [
    { label: "Pre-order", path: "/pre-order" },
    { label: "Home", path: "/" },
    { label: "Keyboard", path: "/products/keyboards" },
    { label: "Mouse", path: "/products/mice" },
    { label: "Deskmat", path: "/products/deskmats" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-4 bg-black text-white">
      <ul className="flex justify-center items-center gap-8">
        {navItems.map((item) => (
          <NavItem key={item.label} to={item.path}>
            {item.label}
          </NavItem>
        ))}

        {user ? (
          <li className="relative text-lg group">
            <div className="flex items-center gap-2 cursor-pointer text-white px-2 py-1">
              <User />
              <span>{user.name || user.email}</span>
            </div>
            <div className="absolute top-full right-0 hidden group-hover:block bg-[#1e1f22] border border-gray-800 rounded-md shadow-lg py-2 w-40">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white"
              >
                Logout
              </button>
            </div>
          </li>
        ) : (
          <NavItem to="/account">Account</NavItem>
        )}

        <li className="relative text-lg">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 cursor-pointer group text-white px-2 py-1"
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
