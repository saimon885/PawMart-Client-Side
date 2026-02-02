import React, { use, useEffect, useState } from "react";
import Logo from "../assets/PetMainLogo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import {
  HiMenuAlt3,
  HiX,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);
  const { user, SignOutUser } = use(AuthContext);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const LogOutUser = () => {
    SignOutUser()
      .then(() => toast.success("Successfully Logged Out"))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pets & Supplies", path: "/allListData" },
    ...(user
      ? [
          { name: "Add Listing", path: "/addlistdata" },
          { name: "My Listings", path: "/mylist" },
          { name: "My Orders", path: "/myorders" },
        ]
      : []),
  ];

  return (
    <div className="bg-base-100/70 w-full backdrop-blur-xl">
      <nav className="mx-auto  px-4 py-2 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 transition-transform hover:scale-105">
            <Link to="/">
              <img className="h-13 md:h-14 w-auto" src={Logo} alt="PetBond" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                      : "hover:bg-primary/10 hover:text-primary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle hover:bg-primary/10 group transition-colors"
            >
              {theme === "light" ? (
                <HiOutlineMoon className="text-2xl group-hover:rotate-12 transition-transform" />
              ) : (
                <HiOutlineSun className="text-2xl text-yellow-500 animate-pulse" />
              )}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar online hover:opacity-80 transition-opacity"
                >
                  <div className="w-11 rounded-2xl ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt="User" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-60 border border-base-200"
                >
                  <div className="px-4 py-3 border-b border-base-200 mb-2">
                    <p className="font-bold text-base-content truncate">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <li>
                    <Link
                      to="/userpropile"
                      className="flex items-center gap-2 py-3 hover:bg-primary/10 rounded-xl px-4 transition-colors"
                    >
                      <HiOutlineUserCircle size={20} /> Profile Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={LogOutUser}
                      className="flex items-center gap-2 py-3 text-error hover:bg-error/10 rounded-xl px-4 mt-1 transition-colors w-full font-bold"
                    >
                      <HiOutlineLogout size={20} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="font-bold hover:text-primary transition-colors px-4"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/20"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden btn btn-ghost btn-circle"
            >
              {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[500px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col gap-2 pb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                onClick={() => setIsOpen(false)}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-primary/5 text-base-content"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {!user && (
              <Link
                to="/register"
                className="btn btn-primary w-full mt-2 rounded-xl"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
