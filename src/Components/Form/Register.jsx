import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const { createUser, updateuser, setUser, googleSignIn } = use(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photourl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log({ name, photo, email, password });

    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])/;
    if (!passwordRegex.test(password)) {
      alert("Please Provide your Strong Password!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be 6 charecter!");
    }
    createUser(email, password)
      .then((res) => {
        // console.log(res.user);
        navigate(from)
        updateuser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...res.user, displayName: name, photoURL: photo });
          })
          .catch(() => "");
        toast.success("Register Successful.");
      })
      .catch((error) => {
        setError(error.code);
      });
  };
  //   googleLog In
  const handlegoogle = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google LogIn Successful.");
      })
      .catch();
  };
  const handleShowOf = () => {
    setShow(!show);
  };
  return (
    <div className="hero my-15">
      <title>PetBond-Register</title>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl text-center font-bold">
            Create Your Account!
          </h1>
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              <label className="label font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                placeholder="Enter your Name"
              />
              <label className="label font-medium">PhotoURL</label>
              <input
                type="text"
                name="photourl"
                required
                className="input rounded-2xl focus:border-0 w-full focus:outline-gray-200"
                placeholder="Enter your PhotoURL"
              />
              <label className="label font-medium">Email</label>
              <input
                type="email"
                name="email"
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
              {error && <p className="text-red-500 font-medium">{error}</p>}
              <div></div>
              <input
                className="btn rounded-2xl bg-linear-65 from-[#eb4d4b] to-[#e056fd] text-white mt-4"
                type="submit"
                value="Register"
              />
            </fieldset>
          </form>
          <p className="text-center -my-2">or</p>
          <button
            onClick={handlegoogle}
            className="btn rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-medium"
          >
            <span>
              <FcGoogle size={24} />
            </span>
            Continue with Google
          </button>
          <p className="text-center">
            Already have an account?
            <Link
              to={"/login"}
              className="text-red-700 font-medium text-[16px]"
            >
              {" "}
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
