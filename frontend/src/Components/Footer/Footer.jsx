import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaSteam,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Abour Us</h3>
            <p className="text-gray-400">
              We create worlds where imagination becomes your next adventure
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>{" "}
            {/* Quick Links */}
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/publishing"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  Publishing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact & Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Soso Factory Inc.</li>
              <li>777 Jelly Pop Road, Floor 2</li>
              <li>Toronto, ON M3M 3B3</li>
              <li>Canada</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Social</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaSteam />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Soso Factory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
