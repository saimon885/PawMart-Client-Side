import React from "react";
import RouteError from "../assets/RouteError.png";
import { useNavigate } from "react-router";
const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="my-15 mx-auto text-center space-y-3">
      <title>Error-404</title>
      <img className="mx-auto w-[300px] md:w-[400px]" src={RouteError} alt="" />
      <h1 className="text-4xl font-medium">Oops, page not found!</h1>
      <p>The page you are looking for is not available.</p>
      <button onClick={() => navigate(-1)} className="btn btn-primary">
        Go Back!
      </button>
    </div>
  );
};

export default Error404;
