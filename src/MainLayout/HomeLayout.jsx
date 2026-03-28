import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner/Banner";
import Category from "../Components/Home/Category";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 overflow-x-hidden">
      <title>PetBond - Home</title>
      

      <main className="pt-[64px] md:pt-[70px]">
        <Navbar />
        <section className="w-full max-w-full overflow-hidden">
          <Banner />
        </section>
        <section className="">
          <Category />
          <div className="mt-8">
            <Outlet />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomeLayout;
