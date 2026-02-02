import Aos from "aos";
import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <section
      data-aos="fade-up"
      className="max-w-7xl mx-auto py-20 px-6 md:px-12 lg:px-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: More about us */}
        <div data-aos="fade-right" className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">
            More about us
          </h2>
          <p className="text-gray-500 leading-relaxed text-2xs">
            PetBond is a comprehensive digital ecosystem designed to nurture the
            relationship between pets and owners. From finding your perfect
            companion to managing essential supplies and listings, we provide a
            seamless, secure, and user-friendly experience to celebrate every
            paw-step of your journey.
          </p>

          {/* Image with rounded corners */}
          <div className="pt-4">
            <img
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1000&auto=format&fit=crop"
              alt="Happy Dog"
              className="rounded-xl w-full h-[400px] object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Right Side: Contact Form Card */}
        <div
          data-aos="fade-left"
          className="bg-secondary rounded-xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl min-h-[550px]"
        >
          <div className="relative z-10 space-y-8">
            <h3 className="text-2xl md:text-3xl font-black leading-tight">
              Feel free to ask us <br />
              <span className="bg-white text-[#FF4D4D] px-3 py-1 rounded-xl inline-block mt-2">
                anything.
              </span>
            </h3>

            <p className="text-white/90 text-2xs md:text-base max-w-sm">
             Have a question about your pet or our services? Reach out today—we’re here to help you and your furry friends!
            </p>

            {/* Form */}
            <form className="space-y-4 pt-4">
              <div>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-full bg-white rounded-xl py-4 px-6 text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message..."
                  rows="4"
                  className="w-full bg-white rounded-xl py-4 px-6 text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/50 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-white text-[#FF4D4D] font-bold px-3 py-2 rounded-xl hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-md group"
              >
                Contact us
                <span className="text-sm group-hover:scale-125 transition-transform">
                  🐾
                </span>
              </button>
            </form>
          </div>

          {/* Decorative Heart Icon (bottom right) */}
          <div className="absolute bottom-10 right-10 opacity-40">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
