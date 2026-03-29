import React, { use, useEffect, useState } from "react";
import Logo from "../assets/PetMainLogo.png";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import {
  HiMenuAlt3,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, SignOutUser } = use(AuthContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const LogOutUser = () => {
    SignOutUser()
      .then(() => toast.success("Successfully Logged Out"))
      .catch(() => toast.error("Failed to log out"));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pets & Supplies", path: "/allListData" },
    { name: "About Us", path: "/aboutUs" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : []),
  ];

  return (
    <div className="drawer">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <header className="fixed top-0 left-0 w-full z-[100] backdrop-blur-lg bg-base-100/70 border-b border-base-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-[64px] md:h-[70px] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label
                htmlFor="nav-drawer"
                className="lg:hidden btn btn-ghost btn-circle"
              >
                <HiMenuAlt3 size={22} />
              </label>

              <Link to="/" className="flex items-center gap-2">
                <img src={Logo} className="h-10 md:h-11" alt="logo" />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="btn btn-ghost bg-base-200 btn-circle btn-sm md:btn-md"
              >
                {theme === "light" ? (
                  <HiOutlineMoon size={20} />
                ) : (
                  <HiOutlineSun size={20} className="text-yellow-400" />
                )}
              </button>

              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="avatar cursor-pointer">
                    <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                      <img src={user?.photoURL} alt="user" />
                    </div>
                  </label>
                  <ul className="dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-xl w-56 border border-base-200 z-[110]">
                    <div className="px-3 py-2 border-b border-base-200">
                      <p className="font-semibold text-sm truncate">
                        {user?.displayName}
                      </p>
                      <p className="text-xs opacity-60 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <li>
                      <Link
                        to="/userpropile"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-base-200 rounded-lg text-sm"
                      >
                        <HiOutlineUserCircle /> Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={LogOutUser}
                        className="flex items-center gap-2 px-3 py-2 text-error hover:bg-error/10 rounded-lg w-full text-sm"
                      >
                        <HiOutlineLogout /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className="btn border-secondary btn-sm">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-sm">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      <div className="drawer-side z-[120]">
        <label htmlFor="nav-drawer" className="drawer-overlay"></label>

        <div className="w-72 min-h-full bg-base-100 p-4 flex flex-col">
          <div className="mb-6 flex items-center gap-2">
            <img src={Logo} className="h-10" alt="logo" />
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive ? "bg-primary text-white" : "hover:bg-base-200"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {!user && (
            <div className="mt-6 flex flex-col gap-2">
              <Link to="/login" className="btn border-secondary w-full">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary w-full">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
