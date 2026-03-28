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
        className="group relative rounded-3xl border border-base-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col bg-base-100"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden group-hover:shadow-inner">
          <img
            className="w-full bg-white h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
            src={image}
            alt={name}
            loading="lazy"
          />

          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="backdrop-blur-md bg-base-200/70 text-primary text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
              <BiCategory size={14} className="animate-pulse" /> {category}
            </span>
          </div>
        </div>

        <div className="px-5 py-5 flex flex-col flex-grow">
          {/* Title */}
          <h1 className="text-lg font-extrabold text-base-content mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h1>

          <div className="space-y-3 mb-6">
            {/* Price */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-base-200 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <FaBangladeshiTakaSign size={14} />
              </div>
              <span className="font-bold text-base-content">{price} BDT</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm ml-1 text-base-content/70">
              <FaLocationDot size={14} />
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto">
            <Link
              to={`/details/${_id}`}
              className="w-full btn bg-gradient-to-r from-secondary to-primary 
                text-white rounded-2xl font-bold 
               flex justify-center items-center gap-2 
               transition-all duration-300 shadow-md hover:shadow-xl 
               active:scale-95 group"
            >
              <span className="text-sm">See Details</span>
              <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecentCategory;
