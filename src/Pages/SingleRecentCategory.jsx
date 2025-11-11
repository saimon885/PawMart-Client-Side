import React from "react";
import { BiCategory } from "react-icons/bi";
import { FaBangladeshiTakaSign, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";

const SingleRecentCategory = ({ petData }) => {
  // console.log(petData);
  const { category, _id, name, image, location, price } = petData;
  return (
    <div>
      <div
        data-aos="fade-up"
        className=" shadow-sm rounded-2xl border p-3  space-y-2  h-full"
      >
        <div className=" md:w-[380px] mx-auto h-[270px] bg-white p-1 rounded-2xl">
          <img
            className="w-full h-full mx-auto rounded-2xl "
            src={image}
            alt=""
          />
        </div>
        <h1 className="text-2xl font-medium border-b mt-5 mb-2 border-[#bdc3c7] pb-3">
          {name}
        </h1>
        <div className="font-semibold flex gap-1 items-center ">
          <BiCategory color="#d72050" size={18} />{" "}
          <span className=""> Category: {category}</span>
        </div>

        <p className="font-semibold flex gap-1 items-center">
          {" "}
          <FaBangladeshiTakaSign size={18} color="#d72050" /> Price : {price}
        </p>
        <p className="font-semibold flex items-center gap-1 ">
          <FaLocationDot color="#d72050" size={17} />
          Location: {location}
        </p>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div></div>
          <Link to={`/details/${_id}`} className="btn btn-primary">
            See Deatails...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleRecentCategory;
