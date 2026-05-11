import React, { useEffect, useState } from "react";
import companyImage from "../../assets/company.png";
import { FcCloseUpMode, FcLike, FcConferenceCall } from "react-icons/fc";
import { motion } from "framer-motion";
import translations from "../../Locale/About.json";

const About = () => {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-32 max-w-7xl"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl mb-24"
        variants={imageVariants}
      >
        <img src={companyImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-80% via-transparent to-slate-900"></div>
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
          <motion.h3
            className="text-2xl md:text-4xl font-bold mb-2 md:mb-3"
            variants={fadeInVariants}
          >
            SOSO Factory
          </motion.h3>
          <motion.p
            className="text-base md:text-xl font-light"
            variants={fadeInVariants}
          >
            {translations[language].subtitle}
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="mb-24 max-w-4xl mx-auto"
        variants={fadeInVariants}
        custom={1}
      >
        <h2 className="text-4xl font-bold mb-8 text-slate-800 text-center">
          {translations[language].title}
        </h2>
        <div className="text-lg leading-relaxed text-gray-600 space-y-6">
          <p>{translations[language].description}</p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32"
        variants={fadeInVariants}
        custom={2}
      >
        {[
          { key: "craft", icon: <FcCloseUpMode /> },
          { key: "ideas", icon: <FcLike /> },
          { key: "community", icon: <FcConferenceCall /> },
        ].map((value, index) => (
          <motion.div
            key={index}
            className="bg-white p-10 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
            variants={fadeInVariants}
            custom={index + 3}
          >
            <div className="flex justify-center mb-2 text-3xl">
              {value.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-rose-900">
              {translations[language].values[value.key].title}
            </h3>
            <p className="text-gray-600 text-lg">
              {translations[language].values[value.key].desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mb-24" variants={fadeInVariants} custom={4}>
        <h2 className="text-4xl font-bold mb-12 text-slate-800 text-center">
          {translations[language].history.title}
        </h2>
        <div className="space-y-12 max-w-5xl mx-auto font-bold">
          {Object.entries(translations[language].history.events).map(
            ([year, event], index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                variants={fadeInVariants}
                custom={index + 5}
              >
                <div className="w-1/2 text-center">
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <h3 className="text-2xl mb-3 text-rose-800">{year}</h3>
                    <p className="text-gray-700 text-lg font-light">{event}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-rose-900 rounded-full"></div>
                <div className="w-1/2"></div>
              </motion.div>
            ),
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
