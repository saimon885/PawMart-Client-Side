import React from "react";
import Banner from "../Banner/Banner";
import Category from "./Category";
import RecentCategoryData from "../../Pages/RecentCategoryData";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <RecentCategoryData></RecentCategoryData>
    </div>
  );
};

export default Home;
