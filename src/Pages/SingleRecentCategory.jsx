import React from "react";
import { BiCategory } from "react-icons/bi";
import { FaBangladeshiTakaSign, FaLocationDot } from "react-icons/fa6";
import { FcCurrencyExchange } from "react-icons/fc";

const SingleRecentCategory = ({ petData }) => {
  console.log(petData);
  const { category, date, name, description, email, image, location, price } =
    petData;
  return (
    <div>
      <div
        data-aos="fade-up"
        className=" shadow-sm rounded-2xl border p-3  space-y-2  h-full"
      >
        <div className=" w-[350px] h-[220px] bg-white p-1 rounded-2xl  mx-auto">
          <img
            className="w-full h-full object-cover mx-auto rounded-2xl "
            src={image}
            alt=""
          />
        </div>
        <h1 className="text-2xl font-medium border-b mt-5 mb-2 border-[#bdc3c7] pb-3">
          {name}
        </h1>
        <div className="font-semibold flex gap-1 items-center bg-[#82ccdd]">
          <BiCategory color="#d72050" size={18} /> Category: {category}
        </div>

        <p className="font-semibold flex gap-1 items-center">
          {" "}
          <FaBangladeshiTakaSign size={18} color="#d72050" /> Price : {price}
        </p>
        <p className="font-semibold flex items-center gap-1 ">
          <FaLocationDot color="#d72050" size={18} />
          Location: {location}
        </p>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div></div>
          {/* <Link to={`/details/${toyId}`} className="btn btn-primary">
            View More...
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SingleRecentCategory;
