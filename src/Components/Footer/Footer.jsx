import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-gray-800 border-t border-blue-200 mt-16 pt-10 px-[5%]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">

        <div>
          <h1 className="text-xl font-bold mb-2">🌐 Daily Price Tracker</h1>
          <p className="text-sm text-gray-600">Track prices from your local market with ease.</p>
        </div>


        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><Mail size={16} /> support@pricewatch.com</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +880 1234-567890</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> Dhaka, Bangladesh</li>
          </ul>
        </div>


        <div>
          <h2 className="text-lg font-semibold mb-2">More</h2>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/terms" className="hover:underline">Terms & Conditions</a>
            </li>
            <li className="flex gap-4 mt-2 text-blue-600">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
            </li>
          </ul>
        </div>
      </div>


      <div className="text-center text-xs text-gray-500 border-t pt-4 pb-6">
        &copy; {new Date().getFullYear()} Daily Price Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;