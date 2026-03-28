import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ScrollToTop from "../ScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ScrollToTop></ScrollToTop>
      <div className="flex-grow sticky z-10">
        <Navbar />
      </div>
      <main className="flex-grow w-full pt-[64px] md:pt-[70px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
