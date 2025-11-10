import React from "react";
import { FaUserAlt } from "react-icons/fa";
import {
  FaBangladeshiTakaSign,
  FaLocationDot,
  FaRegStar,
} from "react-icons/fa6";
import { FcCurrencyExchange } from "react-icons/fc";
import { MdEmail, MdOutlineDateRange } from "react-icons/md";
import { useNavigate } from "react-router";

const SingleListingDetails = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
  const {
    category,
    date,
    _id,
    name,
    description,
    email,
    image,
    location,
    price,
  } = data;
  return (
    <div
      data-aos="fade-up"
      className=" bg-white flex flex-col lg:flex-row py-8 shadow-sm rounded-2xl space-y-4 md:space-y-0 px-5 items-center gap-10 md:gap-20  border border-dotted"
    >
      <div className="w-full bg-white  lg:w-[1000px] border-b md:border-0 pb-6 md:pb-0 border-dashed h-[300] lg:h-[400px]  p-4">
        <img
          className=" mx-auto w-full h-full  rounded-2xl "
          src={image}
          alt=""
        />
      </div>
      <div className="space-y-3 w-full bg-white rounded-2xl shadow-sm p-4">
        <h1 className="text-2xl font-bold">{name}</h1>

        <p className="border-b border-[#95a5a6] pb-5">
          <span className=" font-bold">Description : </span>{" "}
          <span className="">{description}</span>
        </p>
        <h1 className="my-5">
          <span className=" font-bold md:font-medium py-2 px-4 rounded-4xl  bg-[#82ccdd]">
            {category}
          </span>{" "}
        </h1>
        <h2 className="flex gap-1 items-center ">
          <MdOutlineDateRange color="#d72050" size={18} />
          <span className="  flex items-center gap-1 font-bold ">
            PostDate :{" "}
          </span>
          <span>{date}</span>
        </h2>

        <h2 className="flex gap-1 items-center">
          <FaLocationDot color="#d72050" size={18} />
          <span className=" font-bold">Location : </span>
          {location}
        </h2>
        <h1 className=" flex gap-2 items-center">
          <span className="flex gap-1 items-center">
            <span>
              <MdEmail size={19} color="#d72050" />
            </span>
            <span className="font-semibold">Email : </span>
          </span>
          {email}
        </h1>
        <h2 className="flex gap-1 items-center font-bold text-[#3498db]">
          <FaBangladeshiTakaSign size={19} color="#d72050" />
          <span className="  flex items-center gap-1">Price : </span>
          <span>{price}</span>
        </h2>

        <button onClick={() => navigate(-1)} className="btn btn-primary">
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default SingleListingDetails;
