import React from "react";
import Logo from "../assets/PetLogo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
const Footer = () => {
  return (
    <div>
      <div className="bg-[#F6F6F6] rounded-tr-full">
      <footer className="footer flex-row md:flex-col md:justify-around  mt-25 sm:footer-horizontal items-center text-base-content  rounded-tl-6xl p-10">
        <nav className="space-y-2">
          <div className="w-[170px]">
            <img className="w-full" src={Logo} alt="" />
          </div>
          <p className="w-[300px] text-[#4e4e4ee0]">
            PetBond is a complete digital platform that strengthens the bond
            between pets and their owners
          </p>
          <div className="flex gap-2">
            <div className="bg-white rounded-full p-2">
              <FaXTwitter size={18} />
            </div>
            <div className="bg-white rounded-full p-2">
              <FaFacebookF size={18} />
            </div>
            <div className="bg-white rounded-full p-2">
              <FaInstagram size={20} />
            </div>
            <div className="bg-white rounded-full p-2">
              <FaYoutube size={20} />
            </div>
          </div>
        </nav>
        <nav className="space-y-2">
          <h6 className="text-[18px] font-medium">Contact Us</h6>
          <a className="link link-hover flex gap-3 text-[#4e4e4ee0]">
            <span>
              <FaPhoneAlt color="#d72050" size={18} />
            </span>
            <span>(+1800)456-789</span>
          </a>
          <a className="link link-hover flex gap-3 text-[#4e4e4ee0]">
            <span>
              <FiMail color="#d72050" size={18} />
            </span>
            <span>Contact@example.com</span>
          </a>
          <a className="link link-hover flex gap-3 text-[#4e4e4ee0]">
            <span>
              <FaLocationDot color="#d72050" size={18} />
            </span>
            <span>Chandpur,Chottogram,Bangladesh</span>
          </a>
        </nav>
        <nav className="space-y-2">
          <h6 className="text-[18px] font-medium">Legal</h6>
          <a className="link link-hover text-[#4e4e4ee0]">Home</a>
          <a className="link link-hover text-[#4e4e4ee0]">Terms of use</a>
          <a className="link link-hover text-[#4e4e4ee0]">Privacy policy</a>
        </nav>
        <nav>
          <h6 className="text-[18px] font-medium">Newsletter</h6>
          <fieldset className="w-80">
            <div className="join">
              <input
                type="text"
                placeholder="Your Email.."
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </nav>
      </footer>
    </div>
    <div className="bg-accent text-white py-3 px-2">
      <h1 className="text-center heading-Font font-bold">Copyright @2025. All rights Reserve. Carefully Crafted By <span className="text-secondary underline">PetBond</span></h1>
    </div>
    </div>
  );
};

export default Footer;
