import React from 'react';
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner/Banner';
import Category from '../Components/Home/Category';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import LowerFirstBanner from '../Components/Banner/LowerFirstBanner';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <Category></Category>
            <Outlet></Outlet>
            <LowerFirstBanner></LowerFirstBanner>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;