import React, { useState, useEffect, use } from "react";
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
  const { createUser, updateuser, setUser } = use(AuthContext);
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
            const newUser = { name, email, photo };

            fetch("https://my-assignment-10-lime.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  setUser({ ...res.user, displayName: name, photoURL: photo });
                  toast.success(
                    " Registration successful! Welcome to PetBond!",
                  );
                  navigate(from);
                }
              })
              .catch(() => {
                // console.error("Database error:", err);
                setError("Database-e data save hote somossya hoyeche.");
              });
          })
          .catch((err) => setError(err.code));
      })
      .catch((err) => setError(err.code));
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-6 bg-base-100">
      <title>Register | PetBond</title>

      <div
        data-aos="zoom-in"
        className="w-full max-w-[420px] bg-base-100 border border-base-300 rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-6 -right-6 text-base-300 rotate-12">
          <MdOutlinePets size={120} />
        </div>

        <div className="text-center relative z-10 mb-5">
          <div className="w-12 h-12 bg-base-300 text-base-100 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md -rotate-3">
            <MdOutlinePets size={24} />
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">
            Create Account
          </h1>
          <p className="text-sm text-base-content/70 font-medium tracking-tight">
            Join our community of pet lovers
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-base-content/50 uppercase tracking-widest ml-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2.5 text-base-content bg-base-200 border border-base-300 rounded-xl focus:bg-base-100 focus:border-base-content outline-none transition-all text-sm font-medium"
                placeholder="Full Name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-base-content/50 uppercase tracking-widest ml-1">
                Photo URL
              </label>
              <input
                type="text"
                name="photourl"
                required
                className="w-full px-4 py-2.5 text-base-content bg-base-200 border border-base-300 rounded-xl focus:bg-base-100 focus:border-base-content outline-none transition-all text-sm font-medium"
                placeholder="Image URL"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-base-content/50 uppercase tracking-widest ml-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2.5 text-base-content bg-base-200 border border-base-300 rounded-xl focus:bg-base-100 focus:border-base-content outline-none transition-all text-sm font-medium"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-base-content/50 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-2.5 text-base-content bg-base-200 border border-base-300 rounded-xl focus:bg-base-100 focus:border-base-content outline-none transition-all text-sm font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
              >
                {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-bold bg-red-50 p-2 rounded-lg text-center">
              {error}
            </p>
          )}

          <button className="btn w-full bg-gradient-to-r from-secondary to-primary py-3 text-sm font-bold rounded-xl bg-primary text-white hover:opacity-90 transition-all shadow-md">
            Register Now
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-base-content/70 font-medium">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-base-content font-bold hover:underline underline-offset-4 decoration-base-content/40"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
