import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const servicesList = [
  {
    id: 1,
    title: "Launch & Live Operations",
    description: "We manage game launches and live operations end to end.",
    icon: "🎮",
  },
  {
    id: 2,
    title: "Cloud Services",
    description:
      "We build and operate reliable, scalable cloud infrastructure.",
    icon: "☁️",
  },
  {
    id: 3,
    title: "Security Solutions",
    description:
      "We implement secure systems using the latest security technologies.",
    icon: "🔒",
  },
  {
    id: 4,
    title: "Publishing Strategy Consulting",
    description:
      "We partner with teams to shape launch strategy, live operations, and long-term growth.",
    icon: "📊",
  },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

const Publishing = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-32 max-w-7xl"
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-12" variants={fadeInVariants}>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Publishing
        </h1>
        <p className="text-xl text-gray-600">
          Build great games. We take care of the rest.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        variants={fadeInVariants}
        custom={1}
      >
        {servicesList.map((service, index) => (
          <motion.div
            key={service.id}
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
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              5+ Years of Experience
            </h3>
            <p className="text-gray-600">
              Experience across projects in diverse game genres
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Expert Team
            </h3>
            <p className="text-gray-600">
              A team of experienced developers and publishing professionals
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Always on support for live operations and critical issues
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div className="mt-32" variants={fadeInVariants} custom={6}>
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Publishing Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Project Alignment",
              desc: "Aligning on the game’s vision, target market, and launch goals together.",
            },
            {
              step: "02",
              title: "Launch Strategy",
              desc: "Designing a launch strategy covering platforms, timelines, and live operations.",
            },
            {
              step: "03",
              title: "Launch & Live Ops",
              desc: "Executing the launch and supporting stable live operations.",
            },
            {
              step: "04",
              title: "Growth & Optimization",
              desc: "Using live data to guide improvements and long-term growth.",
            },
          ].map((item, index) => (
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
          Ready to start your project?
        </h2>
        <p className="text-xl mb-8">
          Partner with publishing experts to plan your next steps.
        </p>

        <Link
          to="/contact"
          className="bg-white text-rose-700 px-8 py-3 rounded-lg font-semibold hover:bg-rose-50 transition-colors duration-300 inline-block"
        >
          CONTACT US
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Publishing;
