import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    status: "Pending",
  });

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
        "http://localhost:3000/api/contact",
        formData,
      );

      if (response.status === 201) {
        alert("Your message has been received.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          status: "Pending",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      alert(
        "Something went wrong while submitting your inquiry. Please try again later.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-white py-32">
      <div className="container mx-auto py-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Have a question, a project in mind, or just want to connect with us?
            <br />
            Our team is always happy to hear from you!
            <br /> <br />
            Whether it’s about a collaboration, a partnership, a media inquiry,
            or a professional opportunity, we’re here to listen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <form
              className="bg-white rounded-2xl shadow-xl p-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-rose-200 focus:ring-2 focus:ring-rose-200 transition-colors duration-300"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-rose-200 focus:ring-2 focus:ring-rose-200 transition-colors duration-300"
                    placeholder="john.doe@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-rose-200 focus:ring-2 focus:ring-rose-200 transition-colors duration-300"
                    placeholder="Briefly describe your inquiry"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-rose-200 focus:ring-2 focus:ring-rose-200 transition-colors duration-300 h-40"
                    placeholder="Tell us about your project, idea, or any questions you have..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <button className="w-full bg-rose-700 text-white py-4 rounded-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                  SEND
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Phone",
                    info: "+1 437-599-3976",
                    subInfo: "9:00 AM – 5:00 PM",
                  },
                  {
                    title: "Email",
                    info: "support@example.com",
                    subInfo: "Available 24/7",
                  },
                  {
                    title: "Location",
                    info: "5650 Yonge St",
                    subInfo: "Toronto, ON, M2M 4H5",
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

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.6472743157924!2d-79.42127921443829!3d43.7801802696964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d0dd76095b1%3A0x888ffab2861f93ef!2s5650%20Yonge%20St%2C%20North%20York%2C%20ON%20M2M%204H5!5e0!3m2!1sko!2sca!4v1769661426523!5m2!1sko!2sca"
                width="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[600px] lg:h-[600px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
