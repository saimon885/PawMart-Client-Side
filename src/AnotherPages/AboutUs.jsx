import React, { useEffect } from "react";
import {
  PawPrint,
  Dog,
  Stethoscope,
  ArrowUpRight,
  Quote,
  Bone,
} from "lucide-react";
import { Link } from "react-router";

// Swiper Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const AboutUs = () => {
  const [feedbacks, setFeedbacks] = React.useState([]);

  useEffect(() => {
    fetch("https://my-assignment-10-lime.vercel.app/feedbacks", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
      });
  }, []);

  return (
    <div className="font-sans text-base-content selection:bg-primary/30 overflow-x-hidden">
     <div className="md:mt-5">
  <section className="bg-base-100 text-base-content py-10 md:py-28 px-6 relative overflow-hidden">
    <div className="container mx-auto relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-primary rounded-xl rotate-12 inline-block shadow-lg shadow-primary/20">
          <Bone className="text-base-100 w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter">
        About Us
      </h1>
      <nav className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase">
        <Link
          to={"/"}
          className="text-primary cursor-pointer hover:text-primary-focus transition-colors"
        >
          Home
        </Link>
        <span className="text-base-content/50">//</span>
        <span className="text-base-content/70">About Us</span>
      </nav>
    </div>

    <div className="absolute bottom-0 right-0 md:right-6 lg:right-20 w-40 sm:w-56 md:w-72 lg:w-[420px] z-0 pointer-events-none">
      <img
        src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=800"
        alt="Professional Cat"
        className="w-full h-auto object-contain object-bottom drop-shadow-xl"
      />
    </div>

    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
  </section>

  <section className="py-20 md:py-32 container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <div className="relative flex gap-4 md:gap-6 items-end">
        <div className="w-1/2 space-y-6">
          <div className="bg-base-200 p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-base-300 hover:shadow-xl transition-shadow duration-500">
            <img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80"
              alt="Pet Care"
              className="rounded-2xl md:rounded-[2.5rem] w-full h-40 md:h-52 object-cover mb-5"
            />
            <h3 className="font-black text-xl md:text-2xl px-2">
              Personal Care
            </h3>
            <p className="text-base-content/70 text-sm px-2 pb-2 leading-relaxed">
              Dedicated attention for your furry friends.
            </p>
          </div>
        </div>

        <div className="w-1/2 bg-base-200 p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-base-300 relative hover:shadow-xl transition-shadow duration-500">
          <div className="absolute -top-4 -right-2 md:-top-6 md:-right-4 bg-secondary text-base-100 p-3 md:p-4 rounded-2xl shadow-2xl animate-bounce z-10">
            <PawPrint
              size={24}
              className="md:w-6 md:h-6"
              fill="currentColor"
            />
          </div>
          <img
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=80"
            alt="Special Care"
            className="rounded-2xl md:rounded-[2.5rem] w-full h-52 md:h-72 lg:h-80 object-cover mb-5"
          />
          <h3 className="font-black text-xl md:text-2xl px-2">
            Special Care
          </h3>
        </div>
      </div>

      <div className="space-y-8 md:space-y-10">
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-8 border border-primary/20 shadow-sm">
            <PawPrint size={14} fill="currentColor" /> About Us
          </div>
          <h2 className="text-4xl md:text-6xl font-black leading-[1.05] mb-8 tracking-tight">
            Making Your Home <br />
            <span className="text-primary">Good Nutrition</span>
          </h2>
          <p className="text-base-content/70 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
            This is the most common type of veterinary practice, focusing on
            the health and well-being of pets like dogs, cats, and other small
            family members.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-10">
          <button className="group relative bg-base-100 text-base-content w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full font-black overflow-hidden transition-all shadow-2xl border border-base-300 hover:bg-primary hover:text-base-100">
            <span className="relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-sm md:text-base">
              Contact Us{" "}
              <PawPrint
                size={20}
                className="group-hover:rotate-[25deg] transition-transform duration-500"
              />
            </span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </button>

          <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
            <svg
              className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <path
                id="circlePath"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                fill="transparent"
              />
              <text className="text-[9.5px] font-black uppercase tracking-[3px] fill-base-content/30">
                <textPath xlinkHref="#circlePath">
                  Training • Grooming • Pet Care • Food •{" "}
                </textPath>
              </text>
            </svg>
            <div className="bg-base-100 p-4 md:p-5 rounded-full shadow-2xl group cursor-pointer hover:bg-primary transition-colors duration-500">
              <ArrowUpRight className="text-primary group-hover:text-base-100 w-7 h-7 md:w-8 md:h-8 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
      {/* Testimonials Section with Swiper Slider */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-base-200/30">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-base-100 to-transparent"></div>
        <div className="text-center mb-16 px-6 relative z-2">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-base-100 text-primary rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/20">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-6xl text-primary font-bold">
            Happy Pet Owners
          </h2>
        </div>

        <div className="container mx-auto px-6">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {feedbacks.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="bg-base-100 p-10 md:p-12 rounded-[3rem] shadow-xl shadow-base-content/5 h-full relative group hover:-translate-y-3 transition-all duration-700 border border-base-300/50 flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.userName}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-3xl object-cover ring-8 ring-primary/10 group-hover:ring-primary/20 transition-all shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl shadow-lg">
                        <PawPrint
                          size={14}
                          className="text-base-100"
                          fill="currentColor"
                        />
                      </div>
                    </div>
                    <Quote
                      size={56}
                      className="text-base-content/10 group-hover:text-primary/40 transition-colors duration-500"
                      fill="currentColor"
                    />
                  </div>

                  <div className="flex-grow">
                    <h4 className="text-2xl font-black text-base-content mb-1 group-hover:text-primary transition-colors">
                      {item.userName}
                    </h4>
                    <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">
                      {item.productName}
                    </p>
                    <p className="text-base-content/70 leading-relaxed text-base font-medium italic">
                      "{item.description}"
                    </p>
                  </div>

                  {/* Decorative Dots */}
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-primary"
                      ></div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
