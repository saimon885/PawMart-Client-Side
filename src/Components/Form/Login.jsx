import React, { useRef, useState, useEffect, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlinePets } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthContext";
import Aos from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const [show, setShow] = useState(false);
  const emailRef = useRef();
  const { LoginUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  // console.log(location, navigate, from);

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    LoginUser(email, password)
      .then(() => {
        toast.success("Welcome back to PetBond!");
        navigate(from, { replace: true });
      })
      .catch(() => toast.error("Invalid email or password"));
  };

  const handlegoogle = () => {
    googleSignIn()
      .then((res) => {
        const user = res.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };

        fetch("https://my-assignment-10-lime.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Welcome to PetBond!");
            navigate(from, { replace: true });
          })
          .catch((err) => {
            console.error("DB Error:", err);
            navigate(from, { replace: true });
          });
      })
      .catch(() => toast.error("Failed to sign in with Google"));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 text-base-content bg-base-100">
      <div
        data-aos="zoom-in"
        className="w-full max-w-[400px] bg-base-100 border border-base-300 rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-6 -right-6 text-base-300 rotate-12 opacity-20">
          <MdOutlinePets size={120} />
        </div>

        <div className="text-center relative z-10 mb-6">
          <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg rotate-3">
            <MdOutlinePets size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Member Login</h1>
          <p className="text-sm font-medium text-secondary">
            Ready to meet your new best friend?
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest ml-1 text-base-content/50">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              required
              className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary outline-none transition-all text-sm font-medium"
              placeholder="Your email"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/50">
                Password
              </label>
              {/* <Link
                to="/reset"
                className="text-[10px] font-bold text-error hover:underline uppercase"
              >
                Forgot?
              </Link> */}
            </div>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-3 bg-base-100 border border-base-300 rounded-xl focus:border-primary outline-none transition-all text-sm font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-base-content/50 hover:text-primary transition-colors"
              >
                {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <button className="btn w-full bg-gradient-to-r from-secondary to-primary py-3 text-sm font-bold rounded-xl bg-primary text-white hover:opacity-90 transition-all shadow-md">
            Sign In
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-base-300"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-base-100 px-3 text-base-content/50 font-bold tracking-[0.2em]">
              Quick Access
            </span>
          </div>
        </div>

        <button
          onClick={handlegoogle}
          className="w-full py-3 bg-base-100 border border-base-300 text-base-content text-sm font-bold rounded-xl hover:bg-base-200 transition-all flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Google Login
        </button>

        <p className="text-center mt-6 text-sm font-medium">
          New here?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
