import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner/Banner";
import Category from "../Components/Home/Category";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const HomeLayout = () => {
  return (
    <div>
      <title>PetBond-Home</title>
      <div className="fixed w-full z-50">
        <Navbar></Navbar>
      </div>
      <div className="pt-18">
        <Banner></Banner>
      </div>
      <div>
        <Category></Category>
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
