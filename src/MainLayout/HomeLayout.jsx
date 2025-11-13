import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner/Banner";
import Category from "../Components/Home/Category";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
// import LowerFirstBanner from "../Components/Banner/LowerFirstBanner";
// import LowerSecendBanner from "../Components/Banner/LowerSecendBanner";
// import AddTwoBanner from "../Components/Banner/AddTwoBanner";

const HomeLayout = () => {
  return (
    <div>
      <title>PetBond-Home</title>
      <div className="mx-2 md:mx-5">
        <Navbar></Navbar>
      </div>
      <Banner></Banner>
      <div>
        <Category></Category>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
