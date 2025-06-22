import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-yellow-400 text-black mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <Link
            to="/"
            className="flex items-center space-x-2 mb-4"
          >
            <div className="bg-white p-2 rounded-xl shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-yellow-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 
                  14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 
                  2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 
                  14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 
                  0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 
                  .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
            <span className="text-2xl font-extrabold">Swegs</span>
          </Link>
          <p className="text-sm text-gray-800">
            Your trusted place to shop stylish and affordable products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/shop" className="hover:underline">Shop</Link></li>
            <li><Link to="/category" className="hover:underline">Categories</Link></li>
            <li><Link to="/cart" className="hover:underline">Cart</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: support@swegs.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Address: Mumbai, India</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:scale-110 transition-transform"><Facebook size={24} /></a>
            <a href="#" className="hover:scale-110 transition-transform"><Instagram size={24} /></a>
            <a href="#" className="hover:scale-110 transition-transform"><Twitter size={24} /></a>
            <a href="mailto:support@swegs.com" className="hover:scale-110 transition-transform"><Mail size={24} /></a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-yellow-300 text-sm">
        © {new Date().getFullYear()} Swegs. All rights reserved.
      </div>
    </footer>
  );
}
