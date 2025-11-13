import React, { useEffect } from "react";
import banner from "../../assets/petCareBanner.jpg";
import { MdOutlinePets } from "react-icons/md";
import AOS from "aos";
import { useTypewriter } from "react-simple-typewriter";
const LowerFirstBanner = () => {
  const [head_text] = useTypewriter({
    words: [`Adopt from PawMart?`],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
  });
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-up" className="shadow">
      <div className="">
        <p className="text-3xl text-center font-bold mt-15 mb-3 ">
          Why {head_text}
        </p>
      </div>
      <div>
        <div className="hero">
          <div
            data-aos="fade-right"
            className="hero-content flex-col lg:flex-row"
          >
            <img
              src={banner}
              className="w-full md:max-w-sm rounded-lg shadow-2xl"
            />
            <div data-aos="fade-left" className="md:ml-8">
              <p className="py-2 flex gap-4 ">
                <span className="text-[17px] font-semibold">
                  Adopt, Don't Shop: Rescue a Hero Today Every year, millions of
                  wonderful, healthy animals—from playful puppies to calm
                  seniors—find themselves homeless. When you choose to rescue
                  and adopt from a shelter or reputable rescue group instead of
                  buying from a pet store or breeder, you accomplish three
                  profound things:
                </span>
              </p>
              <p className="py-2 flex gap-4 ">
                <span>
                  <MdOutlinePets size={25} color="#d72050" />
                </span>
                <span>
                  <span className="font-bold">You Save a Life:</span> You give a
                  deserving animal a loving second chance and free up space for
                  another pet in need.
                </span>
              </p>
              <p className="py-2 flex gap-4 ">
                <span>
                  <MdOutlinePets size={25} color="#d72050" />
                </span>
                <span>
                  <span className="font-bold">You Fight Cruelty:</span> You stop
                  supporting the cruel commercial breeding industry, like puppy
                  mills, that prioritize profit over animal welfare.
                </span>
              </p>
              <p className="py-2 flex gap-4 ">
                <span>
                  <MdOutlinePets size={25} color="#d72050" />
                </span>
                <span>
                  <span className="font-bold">You Get a Great Pet:</span>{" "}
                  Adopted pets often come spayed/neutered, microchipped, and
                  vaccinated—and they reward your kindness with a boundless,
                  unique love.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowerFirstBanner;
