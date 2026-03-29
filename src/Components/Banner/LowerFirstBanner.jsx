import React, { useEffect } from "react";
import banner from "../../assets/petCareBanner.jpg";
import { MdOutlinePets } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const LowerFirstBanner = () => {
  const [head_text] = useTypewriter({
    words: ["Adopt from PawMart?"],
    loop: {},
    typeSpeed: 200,
    deleteSpeed: 100,
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Why {head_text}
          <Cursor cursorColor="#ef4444" />
        </h2>
        <div className="w-20 h-1 bg-slate-900 mx-auto mt-4 rounded-full opacity-20"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-right" className="relative">
          <div className="absolute -inset-4 bg-slate-100 rounded-3xl -z-10 transform rotate-2"></div>
          <img
            src={banner}
            alt="Pet Care"
            className="w-full rounded-2xl shadow-xl object-cover h-[350px] md:h-[450px]"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg hidden md:block border border-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-red-50 p-3 rounded-xl text-red-500">
                <MdOutlinePets size={24} />
              </div>
              <div className="pr-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  Impact
                </p>
                <p className="text-sm font-bold text-slate-800">100+ Rescued</p>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-left" className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-500 leading-tight">
              Adopt, Don't Shop:{" "}
              <span className="text-slate-500 font-medium">
                Rescue a Hero Today
              </span>
            </h3>
            <p className="text-slate-600 leading-relaxed text-base italic border-l-4 border-slate-100 pl-4">
              Every year, millions of healthy animals find themselves homeless.
              Choosing to rescue instead of buying helps change the world for
              them.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                <MdOutlinePets size={22} />
              </div>
              <div>
                <h4 className="font-bold  mb-1">You Save a Life</h4>
                <p className="text-sm text-slate-500 leading-snug">
                  Give a deserving animal a loving second chance and free up
                  space for another pet in need.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                <MdOutlinePets size={22} />
              </div>
              <div>
                <h4 className="font-bold  mb-1">You Fight Cruelty</h4>
                <p className="text-sm text-slate-500 leading-snug">
                  Stop supporting commercial breeding industries that prioritize
                  profit over animal welfare.
                </p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                <MdOutlinePets size={22} />
              </div>
              <div>
                <h4 className="font-bold  mb-1">You Get a Great Pet</h4>
                <p className="text-sm text-slate-500 leading-snug">
                  Adopted pets often come vaccinated and microchipped, rewarding
                  your kindness with unique love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowerFirstBanner;
