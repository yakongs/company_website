import React from "react";
// import characters from "../../assets/characters.png";
import { gameImages } from "../../assets/gameImages.js";

const original = [
  {
    name: "Bouncy Bistro",
    genre: "Casual / Time Management",
    imageUrl: gameImages[0],
  },
  {
    name: "NEBULA: Rift of Fate",
    genre: "Action RPG / Sci-Fi",
    imageUrl: gameImages[1],
  },
  {
    name: "Tiny Defenders",
    genre: "Tower Defense",
    imageUrl: gameImages[2],
  },
  {
    name: "Ironclad Tactics",
    genre: "Strategy / Turn-Based",
    imageUrl: gameImages[3],
  },
  {
    name: "Skybound Racers",
    genre: "Arcade Racing",
    imageUrl: gameImages[4],
  },
  {
    name: "Lost Signals",
    genre: "Puzzle / Mystery",
    imageUrl: gameImages[5],
  },
  {
    name: "Monster Mail Express",
    genre: "Casual Adventure",
    imageUrl: gameImages[6],
  },
  {
    name: "Paper Coffin",
    genre: "2D Psychological Horror",
    imageUrl: gameImages[7],
  },
];

const published = [
  {
    name: "Between the Lines",
    genre: "Romance Simulation / Narrative",
    imageUrl: gameImages[8],
  },
  {
    name: "Null Protocol",
    genre: "3D Stealth / Sci-Fi",
    imageUrl: gameImages[9],
  },
  {
    name: "Ashes of the Deep",
    genre: "3D RPG / Dark Fantasy",
    imageUrl: gameImages[10],
  },
  {
    name: "Rust Eden",
    genre: "3D Exploration / Post-Apocalyptic",
    imageUrl: gameImages[11],
  },
];

const Games = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-32">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Game Library
        </h2>
        <p className="text-xl text-gray-600">
          Discover worlds we’ve crafted with passion, creativity, and a love for
          play
        </p>
      </div>

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

      <div className="mb-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          SOSO Factory Original
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {original.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="group relative aspect-square overflow-hidden">
                <img
                  src={item.imageUrl}
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
            </div>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          SOSO Factory Publishing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {published.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="group relative aspect-square overflow-hidden">
                <img
                  src={item.imageUrl}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
