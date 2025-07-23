
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="backdrop-blur-sm bg-green-600/30 text-black w-full pt-10">
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-8  px-[2%] lg:px-[5%] ">
        {/* Logo and Name */}
        <div className="flex flex-row space-x-3 ">
          {/* Logo Image */}
          <img
            src="https://i.ibb.co/rGgpvbhM/Screenshot-2025-07-21-at-4-48-07-PM-removebg-preview.png" // Replace with your logo path or URL
            alt="KachaPrice Logo"
            className="w-20 h-12 "
          />

          {/* Site Name and Tagline */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1"> 𝙺𝚊𝚌𝚑𝚊Price</h2>
            <p className="text-sm">Your daily local market price tracker</p>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: support@kanchadam.com</p>
          <p>Phone: +880 1234-567890</p>
        </div>

        {/* Links and Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to={'/term'} className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 pb-5">
            <a href="#" aria-label="Facebook">
              <FaFacebook className="text-xl hover:text-white/80" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="text-xl hover:text-white/80" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="text-xl hover:text-white/80" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin className="text-xl hover:text-white/80" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-green-300 text-black  text-center py-4 text-sm">
        © {new Date().getFullYear()} KachaPrice. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
