import React from "react";
import { Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section: Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8 border-b border-gray-800">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
              <Mail className="h-7 w-7 text-cyan-400" />
              Stay Connected
            </h3>
            <p className="mt-2">
              Get updates on new drops, sales, and community events.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <button
              type="submit"
              className="bg-cyan-500 text-white font-bold px-6 py-3 rounded-md transition-colors hover:bg-cyan-600"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div>
            <h4 className="font-bold text-white tracking-wider uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Keyboards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Deskmats
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pre-orders
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white tracking-wider uppercase mb-4">
              Info
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white tracking-wider uppercase mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Warranty
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white tracking-wider uppercase mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-white transition-colors"
              >
                <Twitter />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <Instagram />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-white transition-colors"
              >
                <Youtube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} AddyKeys. All Rights Reserved.
          </p>
          <p className="mt-2">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
