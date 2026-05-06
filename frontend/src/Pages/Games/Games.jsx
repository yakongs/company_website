import React, { useEffect, useState } from "react";
// import characters from "../../assets/characters.png";
import { gameImages } from "../../assets/gameImages.js";
import { motion } from "framer-motion";
import translations from "../../Locale/Games.json";

const Games = () => {
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

  const originalGames = translations[language].originalGames.games;
  const publishedGames = translations[language].publishedGames.games;

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
      className="container max-w-7xl mx-auto px-4 py-32"
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-24" variants={fadeInVariants}>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          {translations[language].title}
        </h2>
        <p className="text-xl text-gray-600">
          {translations[language].subtitle}
        </p>
      </motion.div>

      {/*
      <div className="flex flex-col md:flex-row gap-12 mb-24 items-center">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Games</h2>
          <div className="text-lg text-gray-600 space-y-6">
            <p>
              <strong>SOSO Factory</strong> is a creative game studio dedicated
              to crafting memorable and engaging interactive experiences. We
              develop immersive, player-focused games built on original ideas,
              blending thoughtful design, playful worlds, and meaningful
              gameplay across platforms.
            </p>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="rounded-xl overflow-hidden">
            <img
              src={characters}
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
        </div>
      </div>
      */}

      <motion.div className="mb-24" variants={fadeInVariants} custom={1}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {translations[language].originalGames.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {originalGames.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              variants={fadeInVariants}
              custom={index}
            >
              <div className="group relative aspect-square overflow-hidden">
                <img
                  src={gameImages[index]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/50" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-rose-600 font-semibold">{item.genre}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="mb-24" variants={fadeInVariants} custom={2}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {translations[language].publishedGames.title}{" "}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {publishedGames.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              variants={fadeInVariants}
              custom={index}
            >
              <div className="group relative aspect-square overflow-hidden">
                <img
                  src={gameImages[index + 8]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/50" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-rose-600 font-semibold">{item.genre}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Games;
