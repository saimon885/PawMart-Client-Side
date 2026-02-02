import React, { useEffect } from "react";
import RouteError from "../assets/RouteError.png";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-12 font-sans overflow-hidden">
      <title>404 | Lost in the Woods</title>

      <div className="max-w-2xl w-full text-center">
        <div data-aos="zoom-in" className="relative mb-10">
          <div className="absolute inset-0 bg-slate-50 rounded-full scale-110 blur-3xl -z-10 opacity-50"></div>
          <img
            className="mx-auto w-[280px] md:w-[350px] drop-shadow-2xl animate-[float_4s_ease-in-out_infinite]"
            src={RouteError}
            alt="Page not found"
          />
        </div>

        <div data-aos="fade-up" data-aos-delay="200" className="space-y-6">
          <div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2">
              Oops! This Page is Off-Leash
            </h2>
          </div>

          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            The page you're looking for has wandered off into the park. Don't
            worry, we can help you find your way back home!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 w-full sm:w-auto"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-3 px-8 py-3.5 bg-white border-2 border-slate-100 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all w-full sm:w-auto"
            >
              <FaHome />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Error404;
