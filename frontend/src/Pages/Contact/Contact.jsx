import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import translations from "../../Locale/Contact.json";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    status: "Pending",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        formData,
      );

      if (response.status === 201) {
        alert(translations[language].alerts.success);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          status: "Pending",
        });
      }
    } catch (error) {
      console.log("Failed to submit contact form:", error);
      alert(translations[language].alerts.error);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <motion.div
      className="min-h-screen bg-white py-32"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="container mx-auto px-4 max-w-6xl"
        variants={fadeInVariants}
        custom={0}
      >
        <motion.div
          className="text-center mb-16"
          variants={fadeInVariants}
          custom={1}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {translations[language].title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {translations[language].subtitle}
            <br />
            {translations[language].subtitle2}
            <br /> <br />
            {translations[language].subtitle3}
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-start"
          variants={fadeInVariants}
          custom={2}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            variants={fadeInVariants}
            custom={3}
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {translations[language].form.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-rose-200 focus:ring-2 focus:ring-rose-200 transition-colors duration-300"
                    placeholder={translations[language].form.placeholders.name}
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {translations[language].form.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-rose-200 focus:ring-2 focus:ring-rose-200 transition-colors duration-300"
                    placeholder={translations[language].form.placeholders.email}
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {translations[language].form.subject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-rose-200 focus:ring-2 focus:ring-rose-200 transition-colors duration-300"
                    placeholder={
                      translations[language].form.placeholders.subject
                    }
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {translations[language].form.message}
                  </label>
                  <textarea
                    name="message"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-rose-200 focus:ring-2 focus:ring-rose-200 transition-colors duration-300 h-40"
                    placeholder={
                      translations[language].form.placeholders.message
                    }
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-rose-700 text-white py-4 rounded-lg font-medium hover:bg-rose-800 transition-colors duration-300"
                >
                  {translations[language].form.submit}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={fadeInVariants}
            custom={4}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {translations[language].contact_info.title}
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: translations[language].contact_info.phone.title,
                    info: translations[language].contact_info.phone.info,
                    subInfo: translations[language].contact_info.phone.subInfo,
                  },
                  {
                    title: translations[language].contact_info.email.title,
                    info: translations[language].contact_info.email.info,
                    subInfo: translations[language].contact_info.email.subInfo,
                  },
                  {
                    title: translations[language].contact_info.location.title,
                    info: translations[language].contact_info.location.info,
                    subInfo:
                      translations[language].contact_info.location.subInfo,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.info}</p>
                      <p className="text-sm text-gray-500">{item.subInfo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              variants={fadeInVariants}
              custom={5}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.6472743157924!2d-79.42127921443829!3d43.7801802696964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d0dd76095b1%3A0x888ffab2861f93ef!2s5650%20Yonge%20St%2C%20North%20York%2C%20ON%20M2M%204H5!5e0!3m2!1sko!2sca!4v1769661426523!5m2!1sko!2sca"
                width="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[600px]"
              ></iframe>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
