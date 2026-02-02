import React from "react";
import { MdOutlinePets } from "react-icons/md";

const Loading = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-white">
      <div className="relative flex justify-center items-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute animate-ping h-16 w-16 rounded-full bg-slate-100 opacity-75"></div>
        
        {/* Rotating border ring */}
        <div className="h-14 w-14 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin"></div>
        
        {/* Center Pet Icon */}
        <div className="absolute text-slate-900 animate-bounce">
          <MdOutlinePets size={24} />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-1">
        <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-800 animate-pulse">
          Loading
        </h3>
        <p className="text-[10px] text-slate-400 font-medium">
          Fetching your furry friends...
        </p>
      </div>

      {/* Decorative dots */}
      <div className="flex gap-1.5 mt-4">
        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-[bounce_1s_infinite_100ms]"></div>
        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-[bounce_1s_infinite_300ms]"></div>
      </div>
    </div>
  );
};

export default Loading;