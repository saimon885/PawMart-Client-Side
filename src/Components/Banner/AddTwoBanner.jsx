import React from "react";
import LowerFirstBanner from "./LowerFirstBanner";
import LowerSecendBanner from "./LowerSecendBanner";
import Progress from "./Progress";
import AboutUs from "./AboutUs";

const AddTwoBanner = () => {
  return (
    <div>
      <div className="mx-5 md:mx-10">
        <LowerFirstBanner></LowerFirstBanner>
      </div>
      <div>
        <Progress></Progress>
        <AboutUs></AboutUs>
      </div>
      <div className="mx-5 md:mx-10">
        <LowerSecendBanner></LowerSecendBanner>
      </div>
    </div>
  );
};

export default AddTwoBanner;
