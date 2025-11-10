import React from "react";
import man1 from "../../assets/man1.png";
import man2 from "../../assets/man2.png";
import man3 from "../../assets/man3.png";
import man4 from "../../assets/man4.png";
const LowerSecendBanner = () => {
  return (
    <div>
      <div className="">
        <p className="text-3xl text-center font-bold mt-8 mb-3 ">
          Meet Our Pet Heroes
        </p>
      </div>

      <div className="grid grid-cols-2 mt-5 gap-7 md:gap-8 md:grid-cols-4 items-center">
        <div className="space-y-4">
          <div className="bg-[#E5E5E5] rounded-2xl">
            {" "}
            <img
              className=" w-[200px] md:w-[300px] md:hover:p-2 mx-auto"
              src={man1}
              alt=""
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-medium">Herry Mccarthy</h1>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#E5E5E5] rounded-2xl">
            {" "}
            <img
              className=" w-[200px] md:w-[300px] md:hover:p-2 mx-auto"
              src={man2}
              alt=""
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-medium ">Bralyen vaughn</h1>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#E5E5E5] rounded-2xl">
            {" "}
            <img
              className=" w-[200px] md:w-[300px] md:hover:p-2 mx-auto"
              src={man3}
              alt=""
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-medium">Jarmine Garzia</h1>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#E5E5E5] rounded-2xl">
            {" "}
            <img
              className=" w-[200px] md:w-[300px] md:hover:p-2 mx-auto"
              src={man4}
              alt=""
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-medium">Nowin Rashid</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowerSecendBanner;
