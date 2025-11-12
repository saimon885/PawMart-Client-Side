import React, { use, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthContext";

const Login = () => {
  const [show, setShow] = useState(true);
  const emailRef = useRef();
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();
  const { LoginUser, googleSignIn, ForgetPass } = use(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    LoginUser(email, password)
      .then(() => {
        toast.success("LogIn Successful.");
        navigate(from);
      })
      .catch((error) => toast.error(error.code));
  };
  const handleShowOf = () => {
    setShow(!show);
  };
  const handlegoogle = () => {
    // alert("click")
    googleSignIn()
      .then(() => {
        toast.success("LogIn Successful.");
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    ForgetPass(email)
      .then(() => {
        toast.success("password reset.");
      })
      .catch(() => {});
  };
  return (
    <div className="hero my-15">
      <title>PetBond-Login</title>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl text-center font-bold">
            LogIn Your Account!
          </h1>
          <form onSubmit={handleLogin}>
            <fieldset className="fieldset">
              <label className="label font-medium">Email</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                required
                className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                placeholder="Enter your email"
              />
              <label className="label font-medium">Password</label>
              <div className="relative">
                <input
                  type={!show ? "text" : "password"}
                  name="password"
                  required
                  className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                  placeholder="Enter your password"
                />
                <span onClick={handleShowOf} className="absolute top-3 right-5">
                  {" "}
                  {show ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </span>
              </div>
              <div onClick={handleForgetPassword}>
                <a className="link link-hover font-medium">Forgot password?</a>
              </div>
              <button className="btn text-white rounded-2xl bg-linear-65 from-[#eb4d4b] to-[#e056fd] mt-4">
                LogIn
              </button>
            </fieldset>
          </form>
          <p className="text-center -my-2">or</p>
          <button
            onClick={handlegoogle}
            className="btn rounded-2xl text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-medium"
          >
            <span>
              <FcGoogle size={24} />
            </span>
            Continue with Google
          </button>
          <p className="text-center">
            Dont have an account?
            <Link
              to={"/register"}
              className="text-red-700 font-medium text-[16px]"
            >
              {" "}
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
