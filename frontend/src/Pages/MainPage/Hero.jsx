import React from "react";
import GameImage from "../../assets/BouncyBistro.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-[110vh] bg-gradient-to-b from-gray-50 to-white pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl 2xl:text-7xl font-bold text-gray-900 leading-tight mb-6 lg:mb-12">
              Bouncy Bistro
              <span className="block text-2xl text-rose-700 mt-2 lg:mt-6">
                Serve adorable customers, upgrade your kitchen, and turn your
                tiny cafe into the most popular spot in town.
              </span>
            </h1>
            {/*<p className="text-lg sm:text-xl text-gray-800 font-semibold mb-8 max-w-2xl mx-auto">
              Available on Steam!
            </p>*/}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-rose-700 text-white rounded-lg hover:bg-rose-800 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl">
                DOWNLOAD
              </button>
              <button className="px-8 py-4 bg-white text-rose-700 rounded-lg border-2 border-rose-700 hover:bg-rose-50 transition-colors duration-300 text-lg font-semibold">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <div className="relative">
              <img
                src={GameImage}
                alt="Bouncy Bistro game key art"
                className="relative rounded-2xl shadow-2xl w-full object-cover transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "500K+", label: "Players Worldwide" },
            { number: "4.8★", label: "Average Rating" },
            { number: "12+", label: "Games Released" },
            { number: "24/7", label: "Player Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-rose-600">
                {stat.number}
              </div>
              <div className="text-gray-900">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
