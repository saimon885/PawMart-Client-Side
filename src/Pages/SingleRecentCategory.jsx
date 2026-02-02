import Aos from "aos";
import React, { useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import {
  FaBangladeshiTakaSign,
  FaArrowRightLong,
  FaLocationDot,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const SingleRecentCategory = ({ petData }) => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);

  const { category, _id, name, image, location, price } = petData;

  return (
    <div className="h-full">
      <div
        data-aos="fade-up"
        className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col"
      >
        {/* Image Container - Professional Aspect Ratio & Styling */}
        <div className="relative w-full aspect-[4/3] overflow-hidden group-hover:shadow-inner">
          <img
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
            src={image}
            alt={name}
            loading="lazy"
          />

          {/* Subtle Overlay for professional look */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/95 backdrop-blur-md text-[#d72050] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
              <BiCategory size={14} className="animate-pulse" /> {category}
            </span>
          </div>
        </div>

        <div className="px-5 py-5 flex flex-col flex-grow">
          {/* Title with better spacing */}
          <h1 className="text-lg font-extrabold text-gray-800 mb-2 group-hover:text-[#d72050] transition-colors line-clamp-1">
            {name}
          </h1>

          <div className="space-y-3 mb-6">
            {/* Price section */}
            <div className="flex items-center text-gray-600 gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-[#d72050] group-hover:text-white transition-colors duration-300">
                <FaBangladeshiTakaSign size={14} />
              </div>
              <span className="text-base text-gray-900 font-bold">
                {price} BDT
              </span>
            </div>

            {/* Location section */}
            <div className="flex items-center text-gray-500 gap-2 text-sm ml-1">
              <FaLocationDot className="text-gray-400" size={14} />
              <span className="truncate">{location}</span>
            </div>
          </div>

          <div className="mt-auto">
            <Link
              to={`/details/${_id}`}
              className="w-full bg-gray-800 hover:bg-[#d72050] text-white py-3 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all duration-300 group/btn shadow-md hover:shadow-xl active:scale-95"
            >
              <span className="text-sm">See Details</span>
              <FaArrowRightLong className="group-hover/btn:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecentCategory;
