import React from "react";
import AOS from "aos";
// import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
// import Aos from "aos";
const Banner = () => {
  //      useEffect(() => {
  //     Aos.init({
  //       duration: 1000,
  //       once: true,
  //     });
  //   }, []);
  return (
    <div>
      <div className="">
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
                  "url(https://i.ibb.co.com/7N1mZsxd/Banner1.jpg)",
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">
                    Find Your Furry Friend Today!
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
                  "url(https://i.ibb.co.com/BVQcbG6s/3786461.jpg)",
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">
                    Adopt, Don’t Shop — Give a Pet a Home.
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
                  "url(https://i.ibb.co.com/5htMYQ1P/3800307.jpg)",
              }}
            >
              <div className="hero-overlay"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">
                    Find Your Furry Friend Today!
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
