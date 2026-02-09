import React, { use, useEffect, useState } from "react";
import {
  HiOutlineLogout,
  HiOutlineMenuAlt2,
  HiOutlineBell,
} from "react-icons/hi";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import Logo from "../../src/assets/PetMainLogo.png";
import {
  MdOutlineLocalGroceryStore,
  MdOutlinePayment,
  MdPostAdd,
} from "react-icons/md";
import { FaRegRectangleList } from "react-icons/fa6";
import { AuthContext } from "../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import { PiUsersFourLight } from "react-icons/pi";

const DashboardLayout = ({ children }) => {
  const { user, SignOutUser } = use(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState();

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://my-assignment-10-flax.vercel.app/users?email=${user?.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const userRole = data.map((item) => item.role);
            setRole(userRole[0]);
          } else {
            setRole(data.role);
          }
        });
    }
  });
  console.log(role);

  const getActiveStyles = (path) => {
    return pathname === path
      ? "bg-slate-900 text-white flex gap-4 py-3 px-4 rounded-xl font-medium transition-all shadow-lg shadow-slate-200"
      : "flex gap-4 py-3 px-4 rounded-xl font-medium text-slate-500 hover:bg-slate-100 transition-all";
  };
  const LogOutUser = () => {
    SignOutUser()
      .then(() => {
        toast.success("Successfully Logged Out");
        navigate("/login");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="drawer lg:drawer-open font-sans text-base-content bg-white">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-[#F8FAFC]">
        {/* --- Header / Navbar Start --- */}
        <header className="navbar bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 lg:px-10 sticky top-0 z-30 h-20">
          <div className="flex-1 gap-4">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-ghost btn-circle bg-slate-50 border-none"
              >
                <HiOutlineMenuAlt2 className="size-6 text-slate-600" />
              </label>
            </div>
          </div>

          <div className=" flex items-center gap-1 md:flex-none">
            {/* Notifications */}
            <button className="btn btn-ghost btn-circle bg-slate-50 border-none relative text-slate-600">
              <HiOutlineBell size={24} />
              <span className="badge badge-success badge-xs absolute top-2 right-2 border-white"></span>
            </button>

            {/* User Profile Summary */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost flex items-center gap-3 px-2 hover:bg-slate-50 rounded-2xl"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 leading-none">
                    {user?.displayName}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">
                    Premium Member
                  </p>
                </div>
                <div className="avatar">
                  <div className="w-10 rounded-xl ring ring-slate-100 ring-offset-2">
                    <img src={user?.photoURL} alt="user" />
                  </div>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-2xl w-52 border border-slate-50"
              >
                <li>
                  <Link to={"/dashboard/userpropile"}>Profile Details</Link>
                </li>

                <li onClick={() => LogOutUser()} className="text-error">
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </header>
        {/* --- Header / Navbar End --- */}

        <main className="p-4 md:p-5 min-h-[calc(100vh-80px)]">
          {children || <Outlet></Outlet>}
        </main>
      </div>

      <div className="drawer-side z-40">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="min-h-full w-60 bg-white border-r border-slate-100 flex flex-col pt-4">
          <Link to={"/"} className="p-3 mb-4 flex items-center gap-3">
            <img className="h-12 w-auto" src={Logo} alt="PetBond Logo" />
          </Link>

          <ul className="menu px-6 py-0 grow gap-2">
            <li className="menu-title text-slate-400 font-bold text-[11px] tracking-widest uppercase mb-4 opacity-70">
              Menu
            </li>
            {role == "admin" && (
              <li>
                <Link
                  to={"/dashboard/totalUsers"}
                  className={getActiveStyles("/dashboard/totalUsers")}
                >
                  <PiUsersFourLight className="size-5" /> Users
                </Link>
              </li>
            )}
            {(role === "user" || role === "admin") && (
              <>
                <li>
                  <Link
                    to={"/dashboard/addlistdata"}
                    className={getActiveStyles("/dashboard/addlistdata")}
                  >
                    <MdPostAdd className="size-5" /> Add List
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/mylist"}
                    className={getActiveStyles("/dashboard/mylist")}
                  >
                    <FaRegRectangleList className="size-5" /> MyList
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/myorders"}
                    className={getActiveStyles("/dashboard/myorders")}
                  >
                    <MdOutlineLocalGroceryStore className="size-5" /> My-Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/order_histry"}
                    className={getActiveStyles("/dashboard/order_histry")}
                  >
                    <MdOutlinePayment className="size-5" /> Payment-History
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="p-6">
            <button
              onClick={() => LogOutUser()}
              className="btn btn-ghost w-full justify-start gap-4 text-slate-500 hover:text-error hover:bg-error/5 rounded-2xl px-4 py-3 h-auto min-h-0 font-bold"
            >
              <HiOutlineLogout className="size-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
