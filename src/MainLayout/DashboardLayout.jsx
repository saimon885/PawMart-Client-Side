import React, { useEffect, useState, useContext } from "react";
import {
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineBell,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import Logo from "../../src/assets/PetMainLogo.png";
import {
  MdOutlineLocalGroceryStore,
  MdOutlinePayment,
  MdPostAdd,
} from "react-icons/md";
import { FaRegRectangleList } from "react-icons/fa6";
import { PiUsersFourLight } from "react-icons/pi";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import { TbShoppingCartPlus } from "react-icons/tb";
import ScrollToTop from "../ScrollToTop";
import { Home, HomeIcon } from "lucide-react";
import { AiOutlineHome } from "react-icons/ai";

const DashboardLayout = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, SignOutUser } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://my-assignment-10-lime.vercel.app/users?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setRole(data[0]?.role);
          } else {
            setRole(data?.role);
          }
        });
    }
  }, [user?.email]);

  const getActiveStyles = (path) =>
    pathname === path
      ? "bg-primary text-primary-content flex gap-4 py-3 px-4 rounded-xl font-medium shadow-md transition-all"
      : "flex gap-4 py-3 px-4 rounded-xl font-medium text-base-content/70 hover:bg-base-200 transition-all";

  const LogOutUser = () => {
    SignOutUser()
      .then(() => {
        toast.success(" Successfully Logged Out");
        navigate("/login");
      })
      .catch(() => toast.error("Failed to log out"));
  };

  return (
    <div className="drawer lg:drawer-open font-sans text-base-content bg-base-200 h-screen overflow-hidden">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* --- Main Content --- */}
      <div className="drawer-content flex flex-col h-full overflow-y-auto">
        <ScrollToTop></ScrollToTop>
        <header className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-300 px-4 lg:px-10 sticky top-0 z-30 h-20 shrink-0">
          <div className="flex-1 lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-circle bg-base-200 border-none"
            >
              <HiOutlineMenuAlt2 className="text-base-content text-2xl" />
            </label>
          </div>
          <div className=" ml-3 flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 md:border border-base-300 shadow-md">
            <span className="text-primary text-sm font-extrabold uppercase tracking-widest">
              {role}
            </span>
            <div className="w-[1px] h-5 bg-base-300"></div>
            <span className="text-base font-bold text-base-content">
              Dashboard
            </span>
          </div>

          <div className="flex  w-full justify-end items-center gap-2 ml-auto">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle bg-base-200 border text-base-content"
            >
              {theme === "light" ? (
                <HiOutlineMoon className="text-2xl" />
              ) : (
                <HiOutlineSun className="text-2xl text-primary" />
              )}
            </button>

            <button className="btn btn-ghost btn-circle bg-base-200 border-none relative text-base-content">
              <HiOutlineBell size={24} />
              <span className="badge badge-secondary badge-xs absolute top-1 right-1 border-base-100"></span>
            </button>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost flex items-center gap-3 px-2 hover:bg-base-200 rounded-2xl"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-base-content leading-none">
                    {user?.displayName}
                  </p>
                  <p className="text-[10px] text-base-content/60 font-medium uppercase mt-1">
                    Premium Member
                  </p>
                </div>
                <div className="avatar">
                  <div className="w-10 rounded-xl ring ring-base-300 ring-offset-2">
                    <img src={user?.photoURL} alt="user" />
                  </div>
                </div>
              </label>

              <ul
                tabIndex={0}
                className="mt-3 z-50 p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-300"
              >
                <li>
                  <Link to={"/dashboard/userpropile"}>Profile Details</Link>
                </li>
                <li onClick={LogOutUser} className="text-error">
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 flex-1">{children || <Outlet />}</main>
      </div>

      {/* --- Sidebar --- */}
      <div className="drawer-side z-40 h-full">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="h-full w-60 bg-base-100 border-r border-base-300 flex flex-col pt-4 sticky top-0 overflow-y-auto">
          <Link to={"/"} className="p-3 mb-4 flex items-center gap-3 shrink-0">
            <img className="h-12 w-auto" src={Logo} alt="PetBond Logo" />
          </Link>

          <ul className="menu px-6 py-0 grow gap-2">
            <li className="menu-title text-base-content/50 font-bold text-[11px] tracking-widest mb-4 opacity-70">
              Menu
            </li>
            <li>
              <Link to={"/dashboard"} className={getActiveStyles("/dashboard")}>
                <AiOutlineHome className="text-lg" /> Home
              </Link>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/totalUsers"}
                    className={getActiveStyles("/dashboard/totalUsers")}
                  >
                    <PiUsersFourLight className="text-lg" /> Users
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/TotalOrder"}
                    className={getActiveStyles("/dashboard/TotalOrder")}
                  >
                    <TbShoppingCartPlus className={"text-lg"} /> Total Order
                  </Link>
                </li>
              </>
            )}

            {(role === "user" || role === "admin") && (
              <>
                <li>
                  <Link
                    to={"/dashboard/addlistdata"}
                    className={getActiveStyles("/dashboard/addlistdata")}
                  >
                    <MdPostAdd className="text-lg" /> Add List
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/mylist"}
                    className={getActiveStyles("/dashboard/mylist")}
                  >
                    <FaRegRectangleList className="text-lg" /> MyList
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/myorders"}
                    className={getActiveStyles("/dashboard/myorders")}
                  >
                    <MdOutlineLocalGroceryStore className="text-lg" /> My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/order_histry"}
                    className={getActiveStyles("/dashboard/order_histry")}
                  >
                    <MdOutlinePayment className="text-lg" /> Payment History
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="p-6 shrink-0 mt-auto">
            <button
              onClick={LogOutUser}
              className="btn btn-ghost w-full justify-start gap-4 text-base-content hover:text-error hover:bg-error/10 rounded-2xl px-4 py-3 font-bold"
            >
              <HiOutlineLogout className="text-lg" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
