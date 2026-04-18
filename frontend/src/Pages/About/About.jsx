import React from "react";
import companyImage from "../../assets/company.png";
import { FcCloseUpMode, FcLike, FcConferenceCall } from "react-icons/fc";
import { motion } from "framer-motion";

const About = () => {
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
            We’re a close-knit group of developers, artists, and dreamers
            building games that people love to play and remember.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="mb-24 max-w-4xl mx-auto"
        variants={fadeInVariants}
        custom={1}
      >
        <h2 className="text-4xl font-bold mb-8 text-slate-800 text-center">
          About Us
        </h2>
        <div className="text-lg leading-relaxed text-gray-600 space-y-6">
          <p>
            At SOSO FACTORY, we believe great games are born where creativity
            meets care. We’re a small but passionate team of developers,
            artists, and designers who love building worlds that players can get
            lost in. From the first sketch to the final line of code, everything
            we make is driven by curiosity, collaboration, and a deep respect
            for the people who play our games.
          </p>
          <p>
            We focus on crafting experiences that feel meaningful, not just
            flashy. Whether it’s a cozy indie title or a bold new adventure, our
            goal is always the same: to create games that spark emotion, invite
            exploration, and stay with you long after you’ve put the controller
            down. At the heart of SOSO Factory is a simple idea. Games should be
            fun, human, and made with love.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32"
        variants={fadeInVariants}
        custom={2}
      >
        {[
          {
            icon: <FcCloseUpMode />,
            title: "Craft with Care",
            desc: "We believe great games are made with attention and love. Every detail, from a single pixel to a line of code, is created with purpose.",
          },
          {
            icon: <FcLike />,
            title: "Brave Ideas",
            desc: "We are not afraid to try new things. We embrace bold ideas, fresh mechanics, and creative risks that make games exciting and memorable.",
          },
          {
            icon: <FcConferenceCall />,
            title: "Community Matters",
            desc: "We believe games are stronger when players feel heard and connected. We listen, learn, and grow together with our community.",
          },
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
              {value.title}
            </h3>
            <p className="text-gray-600 text-lg">{value.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mb-24" variants={fadeInVariants} custom={4}>
        <h2 className="text-4xl font-bold mb-12 text-slate-800 text-center">
          History
        </h2>
        <div className="space-y-12 max-w-5xl mx-auto font-bold">
          {[
            {
              year: "2025",
              event:
                "Flagship mobile title reaches No.1 on iPhone in 30 countries",
            },
            {
              year: "2024",
              event: "Studio relocates to a larger creative space in Toronto",
            },
            {
              year: "2023",
              event: "First original IP launches globally on PC and mobile",
            },
            { year: "2022", event: "Global player base surpasses 500K+" },
            {
              year: "2021",
              event:
                "First mobile game launches on the App Store and Google Play",
            },
            {
              year: "2020",
              event:
                "SOSO Factory is founded by a small team of indie developers",
            },
          ].map((item, index) => (
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
                  <h3 className="text-2xl mb-3 text-rose-800">{item.year}</h3>
                  <p className="text-gray-700 text-lg">{item.event}</p>
                </div>
              </div>
              <div className="w-4 h-4 bg-rose-900 rounded-full"></div>
              <div className="w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
