import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Aos from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  const [text] = useTypewriter({
    words: [
      "Find Your Furry Friend Today!",
      "Adopt, Don’t Shop — Give a Pet.",
      "Every Pet Deserves Love and Care.",
    ],
    loop: {},
    typeSpeed: 200,
    deleteSpeed: 100,
    delaySpeed: 2000,
  });

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const slides = [
    {
      img: "https://i.ibb.co.com/PZ0qZthx/view-cats-dogs-showing-friendship.png",
      sub: "Unconditional Love",
    },
    {
      img: "https://i.ibb.co.com/PsspVtSj/flat-lay-toys-with-food-bowl-fur-brush-dogs.jpg",
      sub: "Adopt Your Companion",
    },
    // {
    //   img: "https://i.ibb.co.com/XZqgCFby/man-resting-grass-sitting-crossed-legs-with-his-dog.jpg",
    //   sub: "Adopt Your Companion",
    // },
    {
      img: "https://i.ibb.co.com/6Jyp0q1R/cute-little-dog-white-chair.jpg",
      sub: "Care & Friendship",
    },
    // {
    //   img: "https://i.ibb.co.com/N6RM7SWF/side-view-man-with-his-dog-grass.jpg",
    //   sub: "Care & Friendship",
    // },
    // {
    //   img: "https://i.ibb.co.com/S7ncbKGY/beautiful-young-woman-playing-with-her-little-dog-park-outdoors-lifestyle-portrait.jpg",
    //   sub: "Unconditional Love",
    // },
  ];

  return (
    <div className="relative w-full overflow-hidden mt-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="h-[400px] md:h-[500px] lg:h-[550px] w-full "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

              <div className="relative h-full max-w-7xl mx-auto px-8 md:px-12 flex flex-col justify-center items-start">
                <div data-aos="fade-up" className="max-w-xl">
                  <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md text-white rounded-md border border-white/30">
                    {slide.sub}
                  </span>

                  <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight min-h-[80px] md:min-h-[120px]">
                    {text}
                    <Cursor cursorColor="#fff" />
                  </h1>

                  <div className="mt-6 flex gap-3">
                    <button className="px-6 py-3 bg-white text-black text-sm font-bold rounded-lg hover:bg-slate-100 transition-all shadow-lg active:scale-95">
                      Explore More
                    </button>
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold rounded-lg hover:bg-white/20 transition-all">
                      Contact Us
                    </button>
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
          background: rgba(255, 255, 255, 0.15);
          width: 40px !important;
          height: 40px !important;
          border-radius: 12px;
          backdrop-filter: blur(8px);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: 900;
        }
        .swiper-pagination-bullet {
          background: white !important;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          width: 24px !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
};

export default Banner;
