import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="mx-5 md:mx-10">
       
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
