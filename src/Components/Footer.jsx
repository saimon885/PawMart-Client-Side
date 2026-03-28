import React from "react";
import Logo from "../assets/PetMainLogo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa"; // fa6 নয়, fa ব্যবহার করতে হবে
import { FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <div>
      <div className="bg-base-200 dark:bg-base-300 mt-10 rounded-t-3xl">
        <footer className="footer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center rounded-tl-6xl p-10 text-base-content dark:text-base-content/90">
          {/* Logo & Social */}
          <nav className="space-y-2">
            <div className="w-[200px] -ml-5">
              <img className="w-full" src={Logo} alt="PetBond Logo" />
            </div>
            <p className="w-[300px] text-base-content/70 dark:text-base-content/50">
              PetBond is a complete digital platform that strengthens the bond
              between pets and their owners
            </p>
            <div className="flex text-base-content gap-2 mt-2">
              <a
                href="https://github.com/saimon885"
                target="_blank"
                className="bg-base-100 dark:bg-base-200 cursor-pointer rounded-full p-2"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/saimon-hossan/"
                target="_blank"
                className="bg-base-100 dark:bg-base-200 cursor-pointer rounded-full p-2"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com/saimon547674"
                target="_blank"
                className="bg-base-100 dark:bg-base-200 cursor-pointer rounded-full p-2"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://www.instagram.com/saimon547674"
                target="_blank"
                className="bg-base-100 dark:bg-base-200 cursor-pointer rounded-full p-2"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </nav>

          {/* Contact */}
          <nav className="space-y-2">
            <h6 className="text-[18px] font-medium text-base-content dark:text-base-content/90">
              Contact Us
            </h6>
            <a className="link link-hover flex gap-3 text-base-content/70 dark:text-base-content/50">
              <span>
                <FaPhone color="#d72050" size={18} />
              </span>
              <span>(+1800)456-789</span>
            </a>
            <a className="link link-hover flex gap-3 text-base-content/70 dark:text-base-content/50">
              <span>
                <FiMail color="#d72050" size={18} />
              </span>
              <span>Contact@example.com</span>
            </a>
            <a className="link link-hover flex gap-3 text-base-content/70 dark:text-base-content/50">
              <span>
                <FaMapMarkerAlt color="#d72050" size={18} />
              </span>
              <span>Chandpur, Chottogram, Bangladesh</span>
            </a>
          </nav>

          {/* Legal */}
          <nav className="space-y-2">
            <h6 className="text-[18px] font-medium text-base-content dark:text-base-content/90">
              Legal
            </h6>
            <a className="link link-hover text-base-content/70 dark:text-base-content/50">
              Home
            </a>
            <a className="link link-hover text-base-content/70 dark:text-base-content/50">
              Terms of use
            </a>
            <a className="link link-hover text-base-content/70 dark:text-base-content/50">
              Privacy policy
            </a>
          </nav>

          {/* Newsletter */}
          <nav className="space-y-2">
            <h6 className="text-[18px] font-medium text-base-content dark:text-base-content/90">
              Newsletter
            </h6>
            <fieldset>
              <div className="join">
                <input
                  type="text"
                  placeholder="Your Email.."
                  className="input input-bordered join-item bg-base-100 dark:bg-base-200 border-base-300 dark:border-base-700 text-base-content dark:text-base-content/90"
                />
                <button className="btn bg-linear-to-r from-secondary to-primary join-item text-white">Subscribe</button>
              </div>
            </fieldset>
          </nav>
        </footer>

        {/* Footer Bottom */}
        <div className="border-t border-base-300 dark:border-base-700 py-3 px-2">
          <h1 className="text-center heading-Font font-bold text-base-content dark:text-base-content/90">
            Copyright @2025. All rights reserved. Carefully Crafted By{" "}
            <span className="text-secondary underline">PetBond</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
