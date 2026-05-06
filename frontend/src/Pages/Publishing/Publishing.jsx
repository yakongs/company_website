import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import translations from "../../Locale/Publishing.json";

const Publishing = () => {
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

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-32 max-w-7xl"
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-12" variants={fadeInVariants}>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          {translations[language].title}
        </h1>
        <p className="text-xl text-gray-600">
          {translations[language].subTitle}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        variants={fadeInVariants}
        custom={1}
      >
        {translations[language].list.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300"
            variants={fadeInVariants}
            custom={index + 2}
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="text-center" variants={fadeInVariants} custom={5}>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {translations[language].whyUs.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {translations[language].whyUs.reasons[0].title}
            </h3>
            <p className="text-gray-600">
              {translations[language].whyUs.reasons[0].description}
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {translations[language].whyUs.reasons[1].title}
            </h3>
            <p className="text-gray-600">
              {translations[language].whyUs.reasons[1].description}
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {translations[language].whyUs.reasons[2].title}
            </h3>
            <p className="text-gray-600">
              {translations[language].whyUs.reasons[2].description}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div className="mt-32" variants={fadeInVariants} custom={6}>
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          {translations[language].process.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {translations[language].process.steps.map((item, index) => (
            <motion.div
              key={index}
              className="relative p-6 bg-white rounded-xl shadow-md"
              variants={fadeInVariants}
              custom={index + 7}
            >
              <div className="text-rose-700 text-5xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-32 bg-rose-700 rounded-2xl p-12 text-center text-white"
        variants={fadeInVariants}
        custom={8}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {translations[language].cta.title}
        </h2>
        <p className="text-xl mb-8">{translations[language].cta.subtitle}</p>

        <Link
          to="/contact"
          className="bg-white text-rose-700 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 transition-colors duration-300 inline-block"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {translations[language].cta.button}
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Publishing;
