import React, { useEffect } from "react";
import man1 from "../../assets/man1.png";
import man2 from "../../assets/man2.png";
import man3 from "../../assets/man3.png";
import man4 from "../../assets/man4.png";
import Aos from "aos";
import "aos/dist/aos.css";

const LowerSecendBanner = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const heroes = [
    { id: 1, name: "Herry Mccarthy", img: man1, role: "Rescue Specialist" },
    { id: 2, name: "Bralyen Vaughn", img: man2, role: "Pet Care Expert" },
    { id: 3, name: "Jarmine Garzia", img: man3, role: "Volunteer Head" },
    { id: 4, name: "Nowin Rashid", img: man4, role: "Senior Vet" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div data-aos="fade-up" className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold  tracking-tight">
          Meet Our Pet Heroes
        </h2>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          The dedicated souls behind every successful adoption.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
        {heroes.map((hero, index) => (
          <div
            key={hero.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group cursor-default"
          >
            <div className="relative overflow-hidden bg-slate-50 rounded-3xl border border-slate-100 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-slate-200/50 group-hover:-translate-y-2">
              <img
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                src={hero.img}
                alt={hero.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="text-center mt-5">
              <h3 className="text-lg md:text-xl font-bold  transition-colors ">
                {hero.name}
              </h3>
              <p className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-widest mt-1">
                {hero.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowerSecendBanner;
