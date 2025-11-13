import React, { useEffect } from "react";
import AOS from "aos";
// import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Aos from "aos";
import { useTypewriter } from "react-simple-typewriter";
// import Aos from "aos";
const Banner = () => {
  const [text] = useTypewriter({
    words: [
      "Find Your Furry Friend Today!",
      "Adopt, Don’t Shop — Give a Pet a Home.",
      " Because Every Pet Deserves Love and Care.",
    ],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
  });

  // /** Hook Output */
  // const { isType, isDelete, isDelay, isDone } = helper;
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div>
      <div className="mt-5">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },

            768: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={() => ""}
          onSwiper={() => ""}
        >
          <SwiperSlide>
            <div
              className="hero min-h-screen"
              style={{
                backgroundImage:
                  "url(https://i.ibb.co.com/XZqgCFby/man-resting-grass-sitting-crossed-legs-with-his-dog.jpg)",
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content text-neutral-content text-center">
                <div data-aos="fade-right" className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold heading-Font">
                    {text}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="hero min-h-screen md:h-[200px]"
              style={{
                backgroundImage:
                  "url(https://i.ibb.co.com/N6RM7SWF/side-view-man-with-his-dog-grass.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "full",
              }}
            >
              <div className="hero-overlay "></div>
              <div className="hero-content text-neutral-content text-center">
                <div data-aos="fade-right" className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold heading-Font">
                    {text}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="hero min-h-screen"
              style={{
                backgroundImage:
                  "url(https://i.ibb.co.com/S7ncbKGY/beautiful-young-woman-playing-with-her-little-dog-park-outdoors-lifestyle-portrait.jpg)",
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content text-neutral-content text-center">
                <div data-aos="fade-right" className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold heading-Font">
                    {text}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
