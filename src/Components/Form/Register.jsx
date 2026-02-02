import React, { use, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdOutlinePets } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const { createUser, updateuser, setUser, googleSignIn } = use(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const photo = e.target.photourl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    if (!passwordRegex.test(password)) {
      setError("Password must have Uppercase & Lowercase letters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    createUser(email, password)
      .then((res) => {
        updateuser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...res.user, displayName: name, photoURL: photo });
            toast.success("Welcome to PetBond!");
            navigate(from);
          })
          .catch((err) => setError(err.code));
      })
      .catch((err) => setError(err.code));
  };

  const handlegoogle = () => {
    googleSignIn()
      .then(() => {
        toast.success("Joined with Google!");
        navigate(from);
      })
      .catch((err) => setError(err.code));
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-6">
      <title>Register | PetBond</title>
      
      <div 
        data-aos="zoom-in" 
        className="w-full max-w-[420px] bg-white border-2 border-slate-50 rounded-[2rem] shadow-2xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-6 -right-6 text-slate-50 rotate-12">
          <MdOutlinePets size={120} />
        </div>

        <div className="text-center relative z-10 mb-5">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg -rotate-3">
            <MdOutlinePets size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-[13px] text-slate-500 font-medium tracking-tight">Join our community of pet lovers</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-900 outline-none transition-all text-sm font-medium"
                placeholder="Full Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Photo URL</label>
              <input
                type="text"
                name="photourl"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-900 outline-none transition-all text-sm font-medium"
                placeholder="Image URL"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-900 outline-none transition-all text-sm font-medium"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-900 outline-none transition-all text-sm font-medium"
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

          {error && <p className="text-[11px] text-red-500 font-bold bg-red-50 p-2 rounded-lg text-center">{error}</p>}

          <button className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-md active:scale-[0.98] mt-2">
            Register Now
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-3 text-slate-300 font-bold tracking-[0.2em]">Social Join</span>
          </div>
        </div>

        <button
          onClick={handlegoogle}
          className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Google Register
        </button>

        <p className="text-center mt-5 text-[13px] text-slate-500 font-medium">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-slate-900 font-bold hover:underline underline-offset-4 decoration-slate-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;