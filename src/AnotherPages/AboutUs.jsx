import React from "react";
import {
  PawPrint,
  Dog,
  Stethoscope,
  ArrowUpRight,
  Quote,
  Bone,
} from "lucide-react";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="font-sans text-[#2D2D2D] bg-white selection:bg-orange-100 overflow-x-hidden">
      <section className="bg-[#1C1917] text-white py-16 md:py-28 px-6 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-orange-500 rounded-xl rotate-12 inline-block shadow-lg shadow-orange-500/20">
              <Bone className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            About Us
          </h1>
          <nav className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase">
            <Link
              to={"/"}
              className="text-orange-500 cursor-pointer hover:text-orange-400 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-700">//</span>
            <span className="text-gray-400">About Us</span>
          </nav>
        </div>

        <div className="absolute bottom-0 right-0 md:right-10 lg:right-32 w-56 sm:w-72 md:w-[450px] lg:w-[500px] z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800"
            alt="Professional Cat"
            className="w-full h-auto object-contain object-bottom brightness-110 contrast-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none"></div>
      </section>

      <section className="py-20 md:py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative flex gap-4 md:gap-8 items-end">
            <div className="w-1/2 space-y-6">
              <div className="bg-[#F9F7F4] p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-orange-50 hover:shadow-xl transition-shadow duration-500">
                <img
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80"
                  alt="Pet Care"
                  className="rounded-2xl md:rounded-[2.5rem] w-full h-44 md:h-64 object-cover mb-5"
                />
                <h3 className="font-black text-xl md:text-2xl px-2">
                  Personal Care
                </h3>
                <p className="text-gray-500 text-sm px-2 pb-2 leading-relaxed">
                  Dedicated attention for your furry friends.
                </p>
              </div>
            </div>

            <div className="w-1/2 bg-[#F9F7F4] p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-orange-50 relative hover:shadow-xl transition-shadow duration-500">
              <div className="absolute -top-4 -right-2 md:-top-6 md:-right-4 bg-orange-600 text-white p-3 md:p-4 rounded-2xl shadow-2xl animate-bounce z-10">
                <PawPrint
                  size={24}
                  className="md:w-6 md:h-6"
                  fill="currentColor"
                />
              </div>
              <img
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80"
                alt="Special Care"
                className="rounded-2xl md:rounded-[2.5rem] w-full h-64 md:h-[24rem]  object-cover mb-5"
              />
              <h3 className="font-black text-xl md:text-2xl px-2">
                Special Care
              </h3>
            </div>
          </div>

          <div className="space-y-8 md:space-y-10">
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-orange-50 text-orange-600 rounded-full text-[1px] md:text-4xl font-black uppercase tracking-[0.2em] mb-8 border border-orange-100 shadow-sm">
                <PawPrint size={14} fill="currentColor" /> About Us
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-[1.05] mb-8 tracking-tight">
                Making Your Home <br />
                <span className="text-orange-500">Good Nutrition</span>
              </h2>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                This is the most common type of veterinary practice, focusing on
                the health and well-being of pets like dogs, cats, and other
                small family members.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-10">
              <button className="group relative bg-[#1C1917] text-white w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full font-black overflow-hidden transition-all shadow-2xl">
                <span className="relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-sm md:text-base">
                  Contact Us{" "}
                  <PawPrint
                    size={20}
                    className="group-hover:rotate-[25deg] transition-transform duration-500"
                  />
                </span>
                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </button>

              <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
                <svg
                  className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="transparent"
                  />
                  <text className="text-[9.5px] font-black uppercase tracking-[3px] fill-gray-300">
                    <textPath xlinkHref="#circlePath">
                      Training • Grooming • Pet Care • Food •{" "}
                    </textPath>
                  </text>
                </svg>
                <div className="bg-[#1C1917] p-4 md:p-5 rounded-full shadow-2xl group cursor-pointer hover:bg-orange-600 transition-colors duration-500">
                  <ArrowUpRight className="text-orange-500 group-hover:text-white w-7 h-7 md:w-8 md:h-8 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 md:mt-32">
          {[
            { icon: <PawPrint />, label: "Pet Caring" },
            { icon: <Dog />, label: "Pet Training" },
            { icon: <PawPrint />, label: "Pet Boarding" },
            { icon: <Stethoscope />, label: "Veterinary" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#1C1917] text-white p-7 md:p-9 rounded-[2rem] flex items-center justify-between gap-4 cursor-pointer hover:bg-orange-600 transition-all duration-500 group shadow-xl hover:-translate-y-2"
            >
              <div className="flex items-center gap-4">
                <span className="text-orange-500 group-hover:text-white transition-colors duration-500">
                  {React.cloneElement(item.icon, { size: 32 })}
                </span>
                <span className="font-black text-xl md:text-2xl tracking-tight">
                  {item.label}
                </span>
              </div>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="text-center mb-20 px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white text-orange-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-orange-100">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            Happy Pet Owners.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-6 container mx-auto">
          {[
            { name: "Biscuit Oliva", img: "https://i.pravatar.cc/150?u=44" },
            { name: "Kristen Stewart", img: "https://i.pravatar.cc/150?u=12" },
            { name: "Emma Watson", img: "https://i.pravatar.cc/150?u=9" },
            { name: "Kozue Matsumoto", img: "https://i.pravatar.cc/150?u=22" },
          ].map((user, idx) => (
            <div
              key={idx}
              className={`bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-gray-200/50 w-full sm:w-[350px] relative group hover:-translate-y-3 transition-all duration-700 border border-gray-100/50
              ${idx % 2 === 0 ? "lg:-rotate-2 hover:rotate-0" : "lg:rotate-2 hover:rotate-0"}`}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="relative">
                  <img
                    src={user.img}
                    alt={user.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-3xl object-cover ring-8 ring-orange-50 group-hover:ring-orange-100 transition-all shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-orange-500 p-2 rounded-xl shadow-lg">
                    <PawPrint size={14} className="text-white" fill="white" />
                  </div>
                </div>
                <Quote
                  size={56}
                  className="text-gray-50 group-hover:text-orange-50 transition-colors duration-500"
                  fill="currentColor"
                />
              </div>
              <h4 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-orange-600 transition-colors">
                {user.name}
              </h4>
              <p className="text-gray-500 leading-relaxed text-base font-medium italic">
                "The level of care and professional nutrition advice we received
                was absolutely game-changing for our pet's health."
              </p>

              {idx < 3 && (
                <div className="hidden xl:flex absolute -right-10 top-1/2 -translate-y-1/2 flex-col gap-2 opacity-10 group-hover:opacity-100 transition-all duration-1000">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-orange-500"
                    ></div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
