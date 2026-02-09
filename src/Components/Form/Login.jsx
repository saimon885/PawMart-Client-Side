import React, { use, useRef, useState, useEffect } from "react";
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
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();
  const { LoginUser, googleSignIn } = use(AuthContext);

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    LoginUser(email, password)
      .then(() => {
        toast.success("Welcome Back to the Pack!");
        navigate(from);
      })
      .catch((error) => toast.error(error.code));
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

        fetch("https://my-assignment-10-flax.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Joined with Google!");
            navigate(from);
          })
          .catch((err) => {
            console.error("DB Error:", err);

            navigate(from);
          });
      })
      .catch((err) => err.code);
  };
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <title>Login | PetBond</title>

      <div
        data-aos="zoom-in"
        className="w-full max-w-[400px] bg-white border-2 border-slate-50 rounded-[2rem] shadow-2xl p-6 md:p-8 relative overflow-hidden"
      >
        {/* Subtle Pet Decoration */}
        <div className="absolute -top-6 -right-6 text-slate-50 rotate-12">
          <MdOutlinePets size={120} />
        </div>

        <div className="text-center relative z-10 mb-6">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg rotate-3">
            <MdOutlinePets size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Member Login
          </h1>
          <p className="text-[13px] text-slate-500 font-medium">
            Ready to meet your new best friend?
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 relative z-10">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-900 outline-none transition-all text-sm font-medium"
              placeholder="Your email"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <Link
                to="/reset"
                className="text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-900 outline-none transition-all text-sm font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <button className="w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-md active:scale-[0.98]">
            Sign In
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-3 text-slate-300 font-bold tracking-[0.2em]">
              Quick Access
            </span>
          </div>
        </div>

        <button
          onClick={handlegoogle}
          className="w-full py-3 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Google Login
        </button>

        <p className="text-center mt-6 text-[13px] text-slate-500 font-medium">
          New here?{" "}
          <Link
            to="/register"
            className="text-slate-900 font-bold hover:underline underline-offset-4 decoration-slate-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
