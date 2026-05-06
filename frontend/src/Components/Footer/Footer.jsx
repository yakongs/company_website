import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaSteam,
} from "react-icons/fa";
import translations from "../../Locale/Footer.json";

const Footer = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en",
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };

    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

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
            <h3 className="text-xl font-bold mb-4">
              {translations[language].aboutUs.title}
            </h3>
            <p className="text-gray-400">
              {translations[language].aboutUs.description}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              {translations[language].resources.title}
            </h3>{" "}
            {/* Quick Links */}
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  {translations[language].resources.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  {translations[language].resources.about}
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  {translations[language].resources.games}
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  {translations[language].resources.careers}
                </Link>
              </li>
              <li>
                <Link
                  to="/publishing"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  {translations[language].resources.publishing}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  {translations[language].resources.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              {translations[language].location.title}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>{translations[language].location.company}</li>
              <li>{translations[language].location.address1}</li>
              <li>{translations[language].location.address2}</li>
              <li>{translations[language].location.country}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              {translations[language].social.title}
            </h3>
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
          <p>{translations[language].copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
