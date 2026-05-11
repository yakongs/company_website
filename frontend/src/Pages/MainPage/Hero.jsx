import React, { useEffect, useState } from "react";
import GameImage from "../../assets/BouncyBistro.jpg";
import BackgroundImage from "../../assets/backgroundImage.jpg";
import { motion } from "framer-motion";
import translations from "../../Locale/Hero.json";

const Hero = () => {
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

  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.7 },
    },
  };

  const statusVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } },
  };

  const stats = [
    { key: "installations" },
    { key: "satisfaction" },
    { key: "experience" },
    { key: "support" },
  ];

  return (
    <div
      className="relative min-h-[110vh] bg-cover bg-center bg-no-repeat pb-0"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              className="text-3xl sm:text-4xl 2xl:text-7xl font-bold text-gray-900 leading-tight mb-6 lg:mb-12"
              initial="hidden"
              animate="visible"
              variants={textVariant}
            >
              Bouncy Bistro
              <motion.span
                className="block text-2xl text-rose-700 mt-2 lg:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {translations[language].description}
              </motion.span>
            </motion.h1>
            {/*<p className="text-lg sm:text-xl text-gray-800 font-semibold mb-8 max-w-2xl mx-auto">
              Available on Steam!
            </p>*/}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                className="px-8 py-4 bg-rose-700 text-white rounded-lg hover:bg-rose-800 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
                initial="hidden"
                animate="visible"
                variants={buttonVariant}
              >
                {translations[language].buttons.download}
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-white text-rose-700 rounded-lg border-2 border-rose-700 hover:bg-rose-50 transition-colors duration-300 text-lg font-semibold"
                initial="hidden"
                animate="visible"
                variants={buttonVariant}
              >
                {translations[language].buttons.learnMore}
              </motion.button>
            </div>
          </div>
          <motion.div
            className="flex-1 w-full max-w-2xl lg:max-w-none"
            initial="hidden"
            animate="visible"
            variants={imageVariant}
          >
            <div className="relative">
              <img
                src={GameImage}
                alt={translations[language].image}
                className="relative rounded-2xl shadow-2xl w-full object-cover transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={statusVariant}
            >
              <div className="text-3xl font-bold text-rose-600">
                {translations[language].stats[stat.key].number}
              </div>
              <div className="text-gray-900">
                {translations[language].stats[stat.key].label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
