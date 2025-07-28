import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa";
import {Link} from "react-router";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-green-100 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 lg:px-8 pt-12 pb-10">
        <div className="flex items-start space-x-4">
          <img
            src="https://i.ibb.co/rGgpvbhM/Screenshot-2025-07-21-at-4-48-07-PM-removebg-preview.png"
            alt="KachaPrice Logo"
            className="w-16 h-auto mt-1"
          />
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">𝙺𝚊𝚌𝚑𝚊Price</h2>
            <p className="text-sm text-green-200">
              Your daily local market price tracker
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <div className="space-y-2 text-sm text-green-200">
            <p>Email: emonsheikhkhalid2@gmail.com</p>
            <p>Phone: +880 1915367729</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to={"/term"}
                className="text-green-200 hover:text-white hover:underline transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>

          <div className="flex space-x-4 mt-6">
            <a
              href="https://www.facebook.com/mohammad.emon.sheikh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-green-200 hover:text-white transition-colors duration-300"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="www.linkedin.com/in/emonsheikh22"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-green-200 hover:text-white transition-colors duration-300"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://x.com/programminghero?lang=bn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-green-200 hover:text-white transition-colors duration-300"
            >
              <FaTwitter size={22} />
            </a>

            <a
              href="https://www.instagram.com/programminghero/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-green-200 hover:text-white transition-colors duration-300"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-green-900 text-green-300 text-center py-4 text-sm">
        © {new Date().getFullYear()} KachaPrice. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
