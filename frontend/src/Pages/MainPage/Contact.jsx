import React from "react";
import { MdCall, MdEmail, MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="bg-white py-20 lg:py-48">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Contact
          </h2>
          <p className="text-gray-600 text-lg">
            Do you have a support request or question regarding one of our
            games? <br />
            Please get in touch!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <MdCall />,
              info: "+1 437-599-3976",
              subInfo: "9:00 AM – 5:00 PM",
            },
            {
              icon: <MdEmail />,
              info: "support@example.com",
              subInfo: "Available 24/7",
            },
            {
              icon: <MdLocationPin />,
              info: "5650 Yonge St",
              subInfo: "Toronto, ON, M2M 4H5",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300 text-center"
            >
              <div className="flex justify-center mb-2 text-3xl text-rose-700">
                {item.icon}
              </div>
              <p className="text-gray-600">{item.info}</p>
              <p className="text-gray-500 text-sm">{item.subInfo}</p>
            </div>
          ))}
        </div>

        <div className="mb-12 max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.6472743157924!2d-79.42127921443829!3d43.7801802696964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d0dd76095b1%3A0x888ffab2861f93ef!2s5650%20Yonge%20St%2C%20North%20York%2C%20ON%20M2M%204H5!5e0!3m2!1sko!2sca!4v1769661426523!5m2!1sko!2sca"
              width="100%"
              height="400"
              allowfullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[600px] lg:h-[600px]"
            ></iframe>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-block px-10 py-3 text-lg font-medium text-white bg-rose-600 rounded-lg shadow hover:bg-rose-700 transition-all duration-300 ease-in-out hover:shadow-lg"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
