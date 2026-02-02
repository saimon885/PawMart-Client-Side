import Aos from "aos";
import React, { useEffect, useState, useRef } from "react";

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const stats = [
    { label: "Statistics", value: 58 },
    { label: "Statistics", value: 76 },
    { label: "Statistics", value: 64 },
  ];

  return (
    <div data-aos="fade-up" className="bg-[#73C8DD] w-full">
      <section
        ref={sectionRef}
        className=" py-16 px-6 md:px-12 lg:px-24 min-h-[500px] flex items-center relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Making a change one <br />
              lovely paw at a{" "}
              <span className="bg-white text-[#FF5A5F] px-4 py-1 rounded-xl inline-block rotate-[-2deg]">
                time
              </span>
            </h2>
            <p className="text-white/90 text-2xs max-w-md">
              PetBond is a complete digital platform that strengthens the bond
              between pets and their owners
            </p>
            <button className="flex items-center gap-2 text-white font-bold hover:underline group">
              Read more
              <span className="group-hover:translate-x-1 transition-transform">
                🐾
              </span>
            </button>
          </div>
          <div className="space-y-10">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-end relative">
                  <span className="text-white font-bold text-xl">
                    {stat.label}
                  </span>

                  <div
                    className={`bg-white text-[#FF5A5F] px-3 py-1 rounded-lg font-bold shadow-sm relative transition-all duration-[1500ms] ease-out mb-2`}
                    style={{
                      transform: isVisible
                        ? `translateX(0)`
                        : `translateX(-20px)`,
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    <span className="relative z-10">
                      {isVisible ? stat.value : 0}%
                    </span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                  {/* Filling Bar */}
                  <div
                    className="h-full bg-[#5FBCCF] rounded-full relative transition-all duration-[2000ms] ease-out shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    style={{
                      width: isVisible ? `${stat.value}%` : "0%",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none">
          <span className="text-[200px] rotate-12 block">🐾</span>
        </div>
      </section>
    </div>
  );
};

// CSS for Shimmer effect
const style = document.createElement("style");
style.innerHTML = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;
document.head.appendChild(style);

export default StatisticsSection;
