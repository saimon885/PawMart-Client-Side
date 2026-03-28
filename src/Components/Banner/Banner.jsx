import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Keyboard,
} from "swiper/modules";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Banner = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const slides = [
    {
      img: "https://i.ibb.co.com/PZ0qZthx/view-cats-dogs-showing-friendship.png",
      sub: "Unconditional Love",
      alt: "Cats and dogs showing friendship",
      text: "Find Your Furry Friend Today!",
    },
    {
      img: "https://i.ibb.co.com/PsspVtSj/flat-lay-toys-with-food-bowl-fur-brush-dogs.jpg",
      sub: "Adopt Your Companion",
      alt: "Pet toys, food bowl, and brush",
      text: "Adopt, Don’t Shop — Give a Pet.",
    },
    {
      img: "https://i.ibb.co.com/6Jyp0q1R/cute-little-dog-white-chair.jpg",
      sub: "Care & Friendship",
      alt: "Cute little dog on a white chair",
      text: "Every Pet Deserves Love and Care.",
    },
  ];

  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="relative w-full overflow-hidden mt-4 shadow-lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Keyboard]}
        effect="fade"
        speed={800}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        keyboard={{ enabled: true }}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        className="h-[400px] md:h-[500px] lg:h-[550px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full bg-gray-200">
              {!loadedImages[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 animate-pulse z-0">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                </div>
              )}

              <img
                src={slide.img}
                alt={slide.alt}
                loading="eager"
                onLoad={() => handleImageLoad(index)}
                className={`absolute inset-0 w-full h-full  object-cover z-0 ${
                  loadedImages[index] ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500`}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10"></div>

              <div className="relative z-20 h-full max-w-7xl mx-auto px-8 md:px-12 flex flex-col justify-center items-start">
                <div data-aos="fade-up" className="max-w-xl">
                  <span className="inline-block px-4 py-2 mb-4 text-xs font-semibold tracking-wider uppercase bg-white/25 backdrop-blur-md text-white rounded-full border border-white/40 shadow-sm">
                    {slide.sub}
                  </span>

                  <div className="p-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                      {slide.text}
                    </h1>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <Link
                      to={"/allListData"}
                      className="btn bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl active:scale-95 transform hover:scale-105"
                    >
                      Explore More
                    </Link>

                    <Link
                      to={"/aboutUs"}
                      className="btn bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/25 transition-all duration-300 shadow-lg"
                    >
                      About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.45) !important;
          width: 44px !important;
          height: 44px !important;
          border-radius: 50% !important;
          backdrop-filter: blur(16px) !important;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.45) !important;
          transition: all 0.3s ease !important;
          border: 1px solid rgba(255, 255, 255, 0.35) !important;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.65) !important;
          transform: scale(1.06) !important;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.55) !important;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: 800 !important;
        }

        /* Mobile: small arrows */
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 36px !important;
            height: 36px !important;
            border: 1px solid rgba(255, 255, 255, 0.25) !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 14px !important;
          }
        }
        .swiper-pagination {
          bottom: 20px !important;
        }
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.8) !important;
          width: 12px !important;
          height: 12px !important;
          opacity: 0.75 !important;
          transition: all 0.25s ease !important;
        }
        .swiper-pagination-bullet-active {
          width: 32px !important;
          border-radius: 6px !important;
          opacity: 1 !important;
          background: white !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;
