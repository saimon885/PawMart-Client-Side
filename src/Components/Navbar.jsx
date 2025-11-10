import React, { use, useState } from "react";
import Logo from "../assets/PetLogo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
const Navbar = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const { user, SignOutUser } = use(AuthContext);
  const LogOutUser = () => {
    SignOutUser()
      .then(() => {
        toast.success("LogOut Successful.");
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  const Links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        {/* <NavLink>Pets & Supplies</NavLink> */}
      </li>

      {user && (
        <div className="lg:flex">
          <li>
            <NavLink to={"/addlistdata"}>Add Listing</NavLink>
          </li>
          <li>
            {/* <NavLink>My Listings</NavLink> */}
          </li>
          <li>
            {/* <NavLink>My Orders</NavLink> */}
          </li>
        </div>
      )}
    </>
  );
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown z-10">
          <div
            tabIndex={0}
            role="btn"
            className="btn btn-ghost md:hidden lg:hidden"
          >
            <div>
              <label className=" swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                {/* hamburger icon */}
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                {/* close icon */}
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
            </div>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg> */}
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>{" "}
        </div>
        <Link to={"/"} className="w-[170px]">
          <img className="w-full" src={Logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden md:flex lg:flex">
        <ul className="menu menu-horizontal">{Links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="rounded-full relative inline-block w-[70px] p-2 mr-2">
              <img
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="rounded-full border-2 border-green-700 mx-auto"
                src={`${user ? user.photoURL : ""}`}
                alt=""
              />
              {user && isHovering && (
                <div className="absolute -top-2  md:-top-1 right-14 md:right-16 p-5  z-10 flex-nowrap">
                  {user.displayName}
                </div>
              )}
            </div>
            <button onClick={LogOutUser} className="btn btn-primary">
              LogOut
            </button>
          </div>
        ) : (
          <div>
            <Link to={"/login"} className="btn btn-primary">
              LogIn
            </Link>
            <Link to={"/register"} className="btn  ml-2 btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
