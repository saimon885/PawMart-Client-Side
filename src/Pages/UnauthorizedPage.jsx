import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaExclamationTriangle,
  FaHome,
  FaArrowLeft,
} from "react-icons/fa";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen   flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-xl w-full text-center bg-base-200 p-10 rounded-3xl shadow-xl border border-base-300 dark:border-slate-700">
        <div className="relative flex justify-center items-center mb-8">
          <FaUserShield className="text-[150px] text-error rotate-12" />
          <FaExclamationTriangle className="absolute text-5xl text-error bottom-2 right-1/3 p-2   rounded-full shadow-lg" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-base-content  mb-4 tracking-tight">
          Access Denied
        </h1>
        <p className="text-xl text-secondary mb-8 font-medium">
          Sorry! This page is restricted to{" "}
          <span className="text-error font-bold tracking-wide">Admins</span>{" "}
          only. You do not have permission to view this content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={goBack}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-base-300  text-base-content  font-semibold rounded-lg hover:bg-opacity-80 transition-all duration-200 shadow"
          >
            <FaArrowLeft />
            Go Back
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-content font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
          >
            <FaHome />
            Back to Home
          </Link>
        </div>

        <p className="mt-12 text-sm text-secondary opacity-60 ">
          If you believe this is an error, please contact your system
          administrator.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
